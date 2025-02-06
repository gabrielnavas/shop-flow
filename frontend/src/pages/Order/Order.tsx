import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router"

import { io } from "socket.io-client"

import { HeaderPage } from "../../components/layout/HeaderPage"
import { Page } from "../../components/ui/Page"
import { AuthContext, AuthContextType, PermissionRole } from "../../contexts/AuthContext/AuthContext"
import { OrderItemComponent } from "./OrderItem"
import { Order, OrderStatusName } from "../../services/entities"
import { OrderService } from "../../services/order-service"
import { distanceFrom } from "../../utils/date"
import { GrStatusInfo } from "react-icons/gr"
import { MdDateRange } from "react-icons/md"
import { BiUser } from "react-icons/bi"
import { Select } from "../../components/ui/Select"
import { SelectOption } from "../../components/ui/SelectOption"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { LiaCalendarCheck } from "react-icons/lia"

const socketEventNames = {
  updateOrderStatusName: 'updateOrderStatusName',
   authorizate: 'authorizate'
};

export const OrderPage = () => {


  const { permissionRoles, accessToken, isAuthenticated } = React.useContext(AuthContext) as AuthContextType
  const isAdmin = permissionRoles.some(permissionRole => permissionRole === PermissionRole.ADMIN)

  const [globalError, setGlobalError] = React.useState<string>('')

  const [orders, setOrders] = React.useState<Order[]>([])

  const socket = React.useMemo(() => io(`${import.meta.env.VITE_SOCKET_ENDPOINT}/order`), [])

  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    document.title = 'Shop flow | Pedidos'
  }, [])


  React.useEffect(() => {
    if (!isAuthenticated) {
      return
    }
    socket.on('connect', function () {
      console.log('socket connect');

      socket.emit(socketEventNames.authorizate, { accessToken });
    });

    socket.on('disconnect', function () {
      console.log('socket disconnected');
    });

    socket.on(socketEventNames.updateOrderStatusName, function (body: {
      orderId: number;
      orderStatusName: OrderStatusName;
      updatedAt: Date,
    }) {
      setOrders(prev => {
        const index = prev.findIndex(order => order.id === body.orderId)
        if (index < 0) {
          return prev
        }
        const newOrders = [...prev]
        newOrders[index].orderStatusName = body.orderStatusName
        newOrders[index].updatedAt = body.updatedAt
        return newOrders
      })
    })
  }, [socket, isAuthenticated, accessToken])

  React.useEffect(() => {
    function fetchOrdersByLoggedUser() {
      if (!accessToken) {
        return
      }
      const orderService = new OrderService(accessToken)
      orderService.findOrdersByLoggedUser()
        .then(orders => {
          setOrders(orders)
        })
    }
    fetchOrdersByLoggedUser()
  }, [accessToken])

  const selectOrderStatusNameOnChange = React.useCallback((
    orderId: number,
    orderStatusName: OrderStatusName
  ) => {
    const orderService = new OrderService(accessToken)
    orderService.updateOrderStatus({
      orderId: orderId,
      orderStatusName: orderStatusName,
    }).then(() => {
      setOrders(prev => {
        const index = prev.findIndex(order => order.id === orderId)
        if (index < 0) {
          return prev
        }
        const newOrders = [...prev]
        newOrders[index].orderStatusName = orderStatusName
        return newOrders
      })
    }).catch(err => {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Tente novamente mais tarde.')
      }
    })
  }, [accessToken])

  return (
    <Page>
      <HeaderPage />
      <Content>
        <Orders>
          <PageTitle>
            Pedidos
          </PageTitle>
          {orders.map((order, index) => (
            <OrderComponent key={index}>
              {globalError && (
                <ErrorList>
                  <ErrorItem>
                    {globalError}
                  </ErrorItem>
                </ErrorList>
              )}
              <Header>
                <Status>
                  <GrStatusInfo />
                  {isAdmin ? (
                    <SelectOrderStatusName
                      $error={false}
                      onChange={e => selectOrderStatusNameOnChange(
                        order.id,
                        e.target.value as OrderStatusName
                      )}
                      value={order.orderStatusName}>
                      {Object.values(OrderStatusName).map((orderStatusName, index) => (
                        <SelectOption
                          key={index}
                          value={orderStatusName}>
                          {OrderService.translate(orderStatusName)}
                        </SelectOption>
                      ))}
                    </SelectOrderStatusName>
                  ) : (
                    OrderService.translate(order.orderStatusName)
                  )}
                </Status>
                <SeparatorVertical />
                <CreatedAt>
                  <LiaCalendarCheck />
                  <span>Pedido feito {distanceFrom(order.createdAt)}</span>
                </CreatedAt>
                {order.updatedAt && (
                  <UpdatedAt>
                    <MdDateRange />
                    <span>Pedido atualizado {distanceFrom(order.updatedAt)}</span>
                  </UpdatedAt>
                )}
                <SeparatorVertical />
                <UserOwn>
                  <BiUser />
                  {order.user.name}
                </UserOwn>
              </Header>
              <OrderItems>
                {order.orderItems.map((orderItem, index) => (
                  <OrderItemComponent
                    key={index}
                    orderItem={orderItem}
                  />
                ))}
              </OrderItems>
            </OrderComponent>
          ))}
        </Orders>
      </Content>
    </Page>
  )
}


const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.lg};
`

const Orders = styled.ul`
  display: flex;
  flex-direction: column;
  width: 800px;
  gap: ${props => props.theme.spacing.lg};
`

const PageTitle = styled.span`
  width: 100%;
  font-weight: bold;
  font-size: calc(${props => props.theme.fontSizes.large} * 1.25);
  color: ${props => props.theme.colors.textPrimary};
`

const OrderComponent = styled.li`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.default};
  border: 1px solid ${props => props.theme.colors.borderColor};
`

const OrderItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: calc(${props => props.theme.spacing.xs} * 1.8) ${props => props.theme.spacing.xs};
`

const Status = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.textPrimary};
  width: 200px;

  svg {
    font-size: calc(${props => props.theme.fontSizes.medium} * 1.25);
  }
`


const SelectOrderStatusName = styled(Select)`
  height: 35px;
  padding: 2px 8px;
`

const CreatedAt = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  span {
    font-weight: 400;
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.textPrimary};
    font-style: italic;
  }

  svg {
    font-size: calc(${props => props.theme.fontSizes.medium} * 1.25);
  }
`

const UpdatedAt = styled(CreatedAt)`
  span {
    font-weight: 400;
    font-size: ${props => props.theme.fontSizes.small};
    color: ${props => props.theme.colors.textPrimary};
  }
`

const UserOwn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};

  svg {
    font-size: calc(${props => props.theme.fontSizes.medium} * 1.25);
  }
`

const SeparatorVertical = styled.div`
  height: 100%;
  width: 1.2px;
  background-color: ${props => props.theme.colors.textSecondary};
`
