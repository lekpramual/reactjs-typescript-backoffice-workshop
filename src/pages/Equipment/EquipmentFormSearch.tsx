import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @form
import { Formik, Form, Field } from "formik";
// @mui
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
// @redux
import { useSelector, useDispatch } from "react-redux";

// @seletor
import { equipmentAll, equipmentSearch } from "@/store/slices/equipmentSlice";
import {
  departmentSelector,
  departmentAll,
} from "@/store/slices/departmentSlice";
// @mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

// @icons
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

interface FilmOptionType {
  inputValue?: string;
  label: string;
  value?: number;
}
const filter = createFilterOptions<FilmOptionType>();

export default function EquipmentFormSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const departmentReducer = useSelector(departmentSelector);

  const initialValues: any = {
    no: "",
    title: "",
    // depart: { name: "", id: null, state: "" },
    depart: {
      label: "--เลือกหน่วยงานที่บันทึก--",
      value: 0,
    },
  };

  function optionNewDeparts() {
    const departs = [{ label: "--เลือกหน่วยงานที่บันทึก--", value: 0 }];
    if (departmentReducer.isResult) {
      departmentReducer.isResult.map((i, index) => {
        return departs.push({
          label: `(${i.CCID}) - ${i.dept_name}`,
          value: i.dept_id,
        });
      });
      return departs;
    } else {
      return departs;
    }
  }

  const departOption = optionNewDeparts();

  const showFormSearch = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
    resetForm,
    values,
  }: any) => {
    return (
      <Form noValidate>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ pt: "6px", width: "100%" }}
        >
          <Grid item lg={3} md={6} xs={12}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-no">
                เลขที่บันทึก
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="no"
                name="no"
                startAdornment={
                  <SearchIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เลขที่บันทึก"
                size="small"
                placeholder="ตัวอย่าง รอ. 0032.102/93"
              />
            </FormControl>
          </Grid>
          <Grid item lg={3.5} md={6} xs={12}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-title">
                เรื่องที่บันทึก
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="title"
                name="title"
                startAdornment={
                  <SearchIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เรื่องที่บันทึก"
                size="small"
                placeholder="ตัวอย่าง สำหรับสำนักงาน จอขนาด 21.5 นิ้ว"
              />
            </FormControl>
          </Grid>
          <Grid item lg={3.5} md={6} xs={12}>
            <FormControl fullWidth size="small">
              <Autocomplete
                value={values.depart}
                noOptionsText={"ไม่มีข้อมูล"}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    console.log("if");
                    // timeout to avoid instant validation of the dialog's form.
                    // setTimeout(() => {
                    //   toggleOpen(true);
                    //   setDialogValue({
                    //     title: newValue,
                    //     year: "",
                    //   });
                    // });
                  } else if (newValue && newValue.inputValue) {
                    console.log("else if");
                    // toggleOpen(true);
                    // setDialogValue({
                    //   title: newValue.inputValue,
                    //   year: "",
                    // });
                  } else {
                    setFieldValue("depart", newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  // const filtered = options.filter(row => row.label === params.inputValue)
                  const filtered = filter(options, params);
                  // if (params.inputValue !== "") {
                  //   filtered.push({
                  //     inputValue: params.inputValue,
                  //     title: `Add "${params.inputValue}"`,
                  //   });
                  // }
                  return filtered;
                }}
                id="free-solo-dialog-demo"
                options={departOption}
                getOptionLabel={(option) => {
                  // e.g value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.label;
                }}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.value === value.value && option.label === value.label
                }
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => (
                  <li {...props}>{option.label}</li>
                )}
                renderInput={(params) => (
                  <Field
                    required
                    sx={{ input: { marginTop: "-3px" } }}
                    {...params}
                    name="depart"
                    id="depart"
                    label={"หน่วยงานที่บันทึก"}
                    component={TextField}
                    size="small"
                    InputLabelProps={{
                      style: { marginTop: "-3px" },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item lg={2} md={6} xs={12}>
            <Stack direction="row" className="text-center">
              <Button
                size="small"
                type="submit"
                variant="contained"
                fullWidth
                className="bg-[#36474f] text-[#fff] hover:text-[#fce805] mr-1"
              >
                <SearchTwoToneIcon /> ค้นหา
              </Button>

              <Tooltip title="โหลดข้อมูล">
                <Button
                  type="submit"
                  variant="contained"
                  className="hover:text-[#fce805] w-[28px]"
                  size="small"
                  onClick={() => {
                    // โหลดข้อมูลทั้งหมด
                    dispatch(equipmentAll());
                    // รีเซตฟอร์ม
                    resetForm();
                    // window.location.reload();
                  }}
                >
                  <RefreshIcon color="inherit" />
                </Button>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    );
  };

  useEffect(() => {
    dispatch(departmentAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Formik
      validate={(values) => {
        let errors: any = {};

        return errors;
      }}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        // console.log(values);
        dispatch(equipmentSearch({ search: values, navigate: navigate }));
        setSubmitting(false);
      }}
    >
      {(props) => showFormSearch(props)}
    </Formik>
  );
}
