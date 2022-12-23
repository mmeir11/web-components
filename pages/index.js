// import styles from '../styles/Home.module.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import getFutureElectronics from '../lib/get-signal-future-electronics'
import mapElectronicsData from '../lib/map-single-electronics-data'
import { makeStyles } from "@mui/styles";
import EnhancedTable from '../components/electronics-table'
import { toast } from 'react-hot-toast'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 26
  },
  searchBar: {
    display: 'flex',
    alignContent: 'center',
    marginTop: 3
  }
}, {name: 'Home'});

const Home = () => {
  const classes = useStyles()

  const [electronicsData, setElectronicsData] = useState([])
  const [partNumber, setPartNumber] = useState('ML-1220')
  const [lookupType, setLookupType] = useState('contains')
  const [isLoading, setIsLoading] = useState(false)

  const handleClickSearch = async (event) => {
    try {
      event.preventDefault()
      if(partNumber.length < 3){
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

  useEffect(() => {
    (async () => {
      const electronicsData = await getFutureElectronics(partNumber, lookupType)

      const mappedElectronicsData = mapElectronicsData(electronicsData)

      setElectronicsData(mappedElectronicsData)
      console.log(mappedElectronicsData);
    })()
  }, [])

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
    <div className={classes.root}>
      <form className={classes.searchBar} onSubmit={handleClickSearch}>
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
          : (<Button type='submit' sx={{padding: 3}}>
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