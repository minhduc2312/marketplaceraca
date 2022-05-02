import React, { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

import { options } from './data'
import { Box } from '@mui/system'
import { FormControl, MenuItem, Select } from '@mui/material'
import axios from 'axios'

const selectNFTsList = [
  {
    name: 'Metamon',
    id: 13,
    img: 'metamon.png'
  },
  {
    name: 'Egg',
    id: 17,
    img: 'egg.png'
  },
  {
    name: 'Yellow Diamond',
    id: 16,
    img: 'DiamondYellow.png'
  },
  {
    name: 'Potion',
    id: 15,
    img: 'potion.png'
  },
  {
    name: 'Kiss-up State Land',
    id: 20,
    img: 'kissup.png'
  },
  {
    name: 'Musk USM Land',
    id: 7,
    img: 'mml.png'
  },
]

const StatsChart = () => {
  const [selectedStats, setSelectedStats] = useState(selectNFTsList[0].id);
  const [optionsCustom, setOptionsCustom] = useState(options)
  const [series, setSeries] = useState([])
  const handleChangeSelect = (e) => {
    setSelectedStats(e.target.value)
    options.title.text = selectNFTsList.filter(item => item.id === Number(e.target.value))[0].name
    // options.title.text = selectNFTsList[e.target.value].name
  }
  

  useEffect(() => {
    axios.get(`/api/raca/market/stats/${selectedStats}/1000`).then(res => {
      if (res?.data) {
        const data = res.data;
        data.sort((a, b) => a < b ? 1 : -1);
        const timeSplit = 15 * 60;
        const dataTemp = {}
        const series = [{
          data: []
        }];
        data.forEach(item => {
          const time = new Date((Math.floor(item.timestamp / timeSplit) * timeSplit) * 1000)

          const unitPrice = Math.floor(item.fixed_price / item.count);
          if (!dataTemp[time]) {
            dataTemp[time] = {
              open: unitPrice,
              high: unitPrice,
              low: unitPrice,
            }
          } else {
            dataTemp[time] = {
              ...dataTemp[time],
              high: dataTemp[time].high < unitPrice ? unitPrice : dataTemp[time].high,
              low: dataTemp[time].low > unitPrice ? unitPrice : dataTemp[time].low,
            }
          }
          dataTemp[time].close = unitPrice;
        })

        Object.values(dataTemp).forEach((item, index) => {
          series[0].data.push([[Object.keys(dataTemp)[index]], [...Object.values(item)]])
        })
        setSeries(series)

      }
    })


    const nameSelected = selectNFTsList.filter(item => item.id === Number(selectedStats))[0].name
    setOptionsCustom(prev => {
      return {
        ...prev,
        title: {
          text: nameSelected + ' Chart',
        },
      }
    })
  }, [selectedStats])
  return (
    <Box id="chart" sx={{ color: '#333' }}>

      <FormControl className='select-stats' style={{ width: '150px' }}>
        <Select
          size='small'
          labelId="select"
          id="filter"
          value={selectedStats}
          onChange={handleChangeSelect}
          sx={{ color: '#fff', }}
          className='select-stats'
        >
          {selectNFTsList && selectNFTsList.map((item, index) => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Chart options={optionsCustom} series={series} type="candlestick" height={350} />
    </Box>
  )
}

export default memo(StatsChart)