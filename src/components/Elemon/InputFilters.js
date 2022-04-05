import {
  Button,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handlePower,
  handleSort,
  handleFilterName,
  handleTokenId,
  addRarity,
  removeRarity,
  addAura,
  removeAura,
} from "../../app/actions";

const InputFilters = () => {
  const { min, max, rarity, aura } = useSelector(
    (state) => state.filtersElemon
  );
  const [minPower, setMinPower] = useState(min);
  const [maxPower, setMaxPower] = useState(max);
  const listAura = [...Array(9).keys()];
  const dispatch = useDispatch();

  const listRarity = [
    {
      rarity: "B",
      color: "#7ebeff",
      textShadow: "0 0 6px #4553ff",
    },
    {
      rarity: "A",
      color: "#83ffcb",
      textShadow: "0 0 6px #45ffb0",
    },
    {
      rarity: "S",
      color: "#ff83fa",
      textShadow: "0 0 6px #ff45d4",
    },
    {
      rarity: "SS",
      color: "#ffe283",
      textShadow: "0 0 6px #eaff45",
    },
    {
      rarity: "SSS",
      color: "#ff8383",
      textShadow: "0 0 6px #ff2424",
    },
  ];

  const handleMinPower = (event) => {
    setMinPower(event.target.value);
  };
  const handleMaxPower = (event) => {
    setMaxPower(event.target.value);
  };
  const handleSortPrice = (event) => {
    dispatch(handleSort(event.target.value));
  };
  const handleName = (event) => {
    dispatch(handleFilterName(event.target.value));
  };
  const handleSubmit = () => {
    dispatch(handlePower({ minPower, maxPower }));
  };
  const changeTokenId = (e) => {
    dispatch(handleTokenId(e.target?.value));
  };
  const handleRarity = (e) => {
    if (e.target.checked) {
      dispatch(addRarity(e.target.value));
    } else {
      dispatch(removeRarity(e.target.value));
    }
  };
  const handleAura = (e) => {
    if (e.target.checked) {
      dispatch(addAura(e.target.value));
    } else {
      dispatch(removeAura(e.target.value));
    }
  };

  useEffect(() => {
    setMinPower(min);
  }, [min]);

  return (
    <div className="filters">
      <div className="filter-content">
        <div className="filter-top">
          <select onChange={handleSortPrice} className="market__select">
            <option value="0">Lowest price</option>
            <option value="1">Highest price</option>
            <option value="2">Lowest Point</option>
            <option value="3">Highest Point</option>
          </select>
          <select onChange={(e) => handleName(e)} className="market__select">
            <option value="0">Elemon name</option>
            <option value="4">Neikoo</option>
            <option value="8">Skurumi</option>
            <option value="9">RusMoonch</option>
            <option value="10">PoxArchies</option>
            <option value="11">Legolas</option>
            <option value="12">Mykasa</option>
            <option value="15">Hyugar</option>
            <option value="16">Inori</option>
            <option value="22">Kuroo</option>
            <option value="17">Elight</option>
            <option value="20">Finter</option>
            <option value="21">Ties</option>
            <option value="26">Hoorus</option>
            <option value="6">Raizer</option>
            <option value="19">Scary</option>
            <option value="13">Cokoner</option>
          </select>
          <Box sx={{ width: "100%" }}>
            <Box className="filters_expand">
              <Box className="filter_item">
                <Typography variant="h5">Rarity</Typography>
                <FormControl
                  component="fieldset"
                  className="checkbox_item rarity"
                >
                  {listRarity.length &&
                    listRarity.map((item, index) => (
                      <FormControlLabel
                        onChange={handleRarity}
                        key={index}
                        value={index + 1}
                        control={
                          <Checkbox
                            sx={{
                              color: item.color,
                              "&.Mui-checked": {
                                color: item.color,
                              },
                            }}
                          />
                        }
                        label={item.rarity}
                        labelPlacement="end"
                        sx={{ color: item.color, textShadow: item.textShadow }}
                      />
                    ))}
                </FormControl>
              </Box>
              <Box className="filter_item">
                <Typography variant="h5">Aura</Typography>
                <FormControl
                  component="fieldset"
                  className="checkbox_item aura"
                >
                  {listAura.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      onChange={handleAura}
                      value={item + 1}
                      control={
                        <Checkbox
                          sx={{
                            color: "#ffe283",
                            "&.Mui-checked": {
                              color: "#ffe283",
                            },
                          }}
                        />
                      }
                      label={
                        <img
                          width="35px"
                          alt="aura"
                          src={`https://app.elemon.io/assets/images/aura/quality_${item + 1
                            }.png`}
                        />
                      }
                      labelPlacement="end"
                    />
                  ))}
                </FormControl>
              </Box>
            </Box>
          </Box>
          <input
            onBlur={changeTokenId}
            className="market__input"
            placeholder="Elemon Id"
            type="number"
          />

          <Box className="filter_power">
            <TextField
              value={minPower}
              onChange={handleMinPower}
              sx={{ width: 100, marginRight: "0.5rem" }}
              id="min-power"
              label="Min"
              variant="standard"
              type="number"
              className="input_power min"
            />
            <TextField
              value={maxPower}
              onChange={handleMaxPower}
              sx={{ width: 100, marginRight: "0.5rem" }}
              id="max-power"
              label="Max"
              variant="standard"
              type="number"
              className="input_power max"
            />
            <Button
              sx={{ height: "100%", color: "#383838", background: "#fcc33c" }}
              variant="contained"
              onClick={handleSubmit}
              className="btnConfirm_power"
            >
              Confirm
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default InputFilters;
