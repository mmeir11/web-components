// import styles from '../styles/Home.module.css'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import getFutureElectronics from '../lib/get-signal-future-electronics'
import mapElectronicsData from '../lib/map-single-electronics-data'
import EnhancedTable from '../components/electronics-table'
import { toast } from 'react-hot-toast'
import getSheetData from '../lib/get-sheet-data';
import axios from 'axios';
import getMultipleFutureElectronics from '../lib/get-multiple-future-electronics';
import mapMultipleElectronicsData from '../lib/map-multiple-electronics-data';

const Home = () => {

  const [electronicsData, setElectronicsData] = useState([])
  const [partNumber, setPartNumber] = useState('ML-')
  const [lookupType, setLookupType] = useState('contains')
  const [isLoading, setIsLoading] = useState(false)

  const handleClickSearch = async (event) => {
    try {
      event.preventDefault()
      if (partNumber.length < 3) {
        toast.error('Part number need to be at least 3 chars')
        return
      }

      setIsLoading(true)

      const electronicsData = await getFutureElectronics(partNumber, lookupType)
      const mappedElectronicsData = mapElectronicsData(electronicsData)

      console.log(mappedElectronicsData);

      setElectronicsData(mappedElectronicsData)
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false)
    }
  }

  /* useEffect(() => {
    (async () => {
      const sheetDataResponse = await axios.get('http://localhost:3000/api/get-sheet')

      if (sheetDataResponse.status !== 200) {
        throw new Error('failed to get sheet data')
      }

      const { sheetData } = sheetDataResponse.data
      const parts = sheetData.map((row) => row.partNumber)

      // TODO: remove the temp and return the getMultiple... function
      debugger
      const multipleElectronicsData = await getMultipleFutureElectronics(parts)
      const mappedMultipleElectronicsData = mapMultipleElectronicsData(multipleElectronicsData)

      const outOfStock = mappedMultipleElectronicsData.filter((electronic) => electronic?.offers.length > 0 && electronic.offers?.every((offer) => offer?.quantity === 0))
      const inStock = mappedMultipleElectronicsData.filter((electronic) => electronic?.offers.length > 0 && electronic.offers?.some((offer) => offer?.quantity > 0))
      const offersNotFound = mappedMultipleElectronicsData.filter((electronic) => !electronic?.offers.length)

      const inStockAsExcelData = inStock.map((electronic) => {
        const offer = electronic.offers?.find((offer) => offer?.quantity > 0)
        const { quantity, manufacture, leadTime, leadTimeType, price } = offer

        return [electronic.partNumber, quantity, manufacture, `${leadTime} ${leadTimeType}`, price]
      })
      const outOfStockAsExcelData = outOfStock.map((electronic) => [electronic.partNumber])
      const offersNotFoundAsExcelData = offersNotFound.map((electronic) => [electronic.partNumber])

      const sendReportEmailBody = {
        inStock: inStockAsExcelData,
        outOfStock: outOfStockAsExcelData,
        offersNotFound: offersNotFoundAsExcelData,
      }

      const sendReportEmailResponse = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/send-report-email',
        data: sendReportEmailBody
      })

      const sendReportEmailData = sendReportEmailResponse.data


      // const electronicsData = await getFutureElectronics(partNumber, lookupType)

      // const mappedElectronicsData = mapElectronicsData(electronicsData)

      // setElectronicsData(mappedElectronicsData)
      // console.log(mappedElectronicsData);
    })()
  }, []) */

  const headers = useMemo(() => [
    {
      id: 'mpn',
      label: 'mpn',
    },
    {
      id: 'partNumber',
      label: 'Part Number',
    },
    {
      id: 'manufacture',
      label: 'Manufacture',
    },
    {
      id: 'price',
      label: 'Price',
    },
    {
      id: 'leadTime',
      label: 'Lead Time',
    },
    {
      id: 'quantity',
      label: 'Quantity',
    },
  ], [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 26 }}>
      <form onSubmit={handleClickSearch} style={{ display: 'flex', alignContent: 'center', marginTop: 3 }}>
        <TextField
          value={partNumber}
          onChange={(e) => setPartNumber(e.target.value)}
          label='Part Number'
          margin='dense'
        />
        <FormControl margin='dense'>
          <InputLabel id="lookup-type-label">Lookup Type</InputLabel>
          <Select
            labelId="lookup-type-label"
            id="lookup-type"
            value={lookupType}
            onChange={(e) => setLookupType(e.target.value)}
            label='Lookup Type'
          >
            <MenuItem value='default'>Default</MenuItem>
            <MenuItem value='exact'>Exact</MenuItem>
            <MenuItem value='contains'>Contains</MenuItem>
            <MenuItem value='starts_with'>Starts with</MenuItem>
          </Select>
        </FormControl>
        {isLoading ? <CircularProgress sx={{ margin: 2 }} size={25} />
          : (<Button type='submit' sx={{ padding: 3 }}>
            Search
          </Button>)}
      </form>

      <div style={{ display: 'flex', flex: 1, height: '100%' }}>
        <EnhancedTable
          title=''
          headers={headers}
          rows={electronicsData}
        />
      </div>
    </div>
  )
}

export default Home