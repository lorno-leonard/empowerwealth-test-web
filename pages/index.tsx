import React, { FC, useCallback, useEffect, useState } from 'react'
import { Col, Row, Select, Typography } from 'antd'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import styled from '@emotion/styled'

import Container from '@components/Container'
import Loader from '@components/Loader'
import { useAppState } from '@lib/context/AppContext'
import usePrevious from '@lib/hooks/usePrevious'
import { PropertyData } from '@lib/types'
import apiService from '@services/api'

type DataSeriesProperyData = {
  name: string
  Expense: number
  Income: number
}

const PropertySelect = styled(Select)`
  margin-bottom: 20px;
  width: 100%;
`

const { Option } = Select
const { Title } = Typography

const Home: FC = () => {
  const { user } = useAppState()
  const [properties, setProperties] = useState<PropertyData[]>([])
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [, setLoadingProperty] = useState<boolean>(false)
  const [chartData, setChartData] = useState<DataSeriesProperyData[]>([])

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
          const propertyData = { ...response.data?.property } as PropertyData
          setSelectedProperty(propertyData)
          if (propertyData?.expense) {
            setChartData(
              Object.keys(propertyData?.expense).map(
                (month): DataSeriesProperyData => ({
                  name: month,
                  Expense: propertyData?.expense ? propertyData?.expense[month] : 0,
                  Income: propertyData?.income ? propertyData?.income[month] : 0,
                })
              )
            )
          }
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (key: any) => {
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
      (selectedProperty &&
        prevSelectedProperty &&
        selectedProperty.propertyId !== prevSelectedProperty.propertyId) ||
      (selectedProperty && !prevSelectedProperty)
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
            <PropertySelect showSearch onChange={handleSelectChange}>
              {properties.map((property) => (
                <Option key={property.propertyId} value={property.propertyId}>
                  {property.propertyName}
                </Option>
              ))}
            </PropertySelect>
          )}
          <BarChart width={670} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Expense" fill="#FCA245" />
            <Bar dataKey="Income" fill="#1CAD75" />
          </BarChart>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
