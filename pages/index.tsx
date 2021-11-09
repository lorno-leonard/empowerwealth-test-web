import React, { FC, useCallback, useEffect, useState } from 'react'
import { Col, Collapse, Row, Spin, Typography } from 'antd'

import Container from '@components/Container'
import Loader from '@components/Loader'
import { useAppState } from '@lib/context/AppContext'
import usePrevious from '@lib/hooks/usePrevious'
import { PropertyData } from '@lib/types'
import apiService from '@services/api'

const { Panel } = Collapse
const { Title } = Typography

const Home: FC = () => {
  const { user } = useAppState()
  const [properties, setProperties] = useState<PropertyData[]>([])
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingProperty, setLoadingProperty] = useState<boolean>(false)

  const prevSelectedProperty = usePrevious<PropertyData | null>(selectedProperty)

  const getProperties = useCallback(() => {
    setLoading(true)

    const loadProperties = async () => {
      try {
        const response = await apiService.get('/property', {
          headers: {
            Authorization: user?.token,
          },
        })
        setProperties(response?.data?.properties)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log({ error })
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [user?.token])

  const getSingleProperty = useCallback(() => {
    if (selectedProperty) {
      setLoadingProperty(true)

      const loadSingleProperty = async () => {
        try {
          const response = await apiService.get(`/property/${selectedProperty.propertyId}`, {
            headers: {
              Authorization: user?.token,
            },
          })
          setSelectedProperty({ ...response.data?.property } as PropertyData)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log({ error })
        } finally {
          setLoadingProperty(false)
        }
      }

      loadSingleProperty()
    }
  }, [selectedProperty, user?.token])

  const handleCollapseChange = (key: string | string[]) => {
    if (typeof key !== 'string') return

    const property = properties.find((obj: PropertyData) => +key === obj.propertyId)
    if (property) {
      setSelectedProperty(property)
    }
  }

  useEffect(() => {
    if (user) {
      getProperties()
    }
  }, [getProperties, user])

  useEffect(() => {
    if (
      selectedProperty &&
      prevSelectedProperty &&
      selectedProperty.propertyId !== prevSelectedProperty.propertyId
    ) {
      getSingleProperty()
    }
  }, [selectedProperty, prevSelectedProperty, getSingleProperty])

  if (!user?.token || loading) {
    return <Loader />
  }

  return (
    <Container>
      <Row>
        <Col span={12} offset={6}>
          {!properties.length && <Title level={3}>No properties found</Title>}
          {!!properties.length && (
            <Collapse accordion onChange={handleCollapseChange}>
              {properties.map((property) => (
                <Panel header={property.propertyName} key={property.propertyId}>
                  {loadingProperty && property.propertyId === selectedProperty?.propertyId && (
                    <Spin />
                  )}
                  {!loadingProperty &&
                    property.propertyId === selectedProperty?.propertyId &&
                    !!selectedProperty?.income?.length &&
                    !!selectedProperty?.expense?.length && <Spin spinning />}
                </Panel>
              ))}
            </Collapse>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Home
