import React, { useEffect } from "react";
// @form
import { Formik, Form, Field } from "formik";
// @mui
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
} from "@mui/material";
// @redux
import { useSelector, useDispatch } from "react-redux";

// @seletor
import { productSearch } from "@/store/slices/productSlice";
import { categorySelector, categoryAll } from "@/store/slices/categorySlice";

// @mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
// @type
import { ProductTypeSearch } from "@/types";
// @icons
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ProductFormSearch() {
  const dispatch = useDispatch<any>();
  const categoryReducer = useSelector(categorySelector);

  const initialValues: ProductTypeSearch = {
    no: "",
    no_txt: "",
    category: 0,
  };

  const CustomizedSelectForFormikV2 = ({
    children,
    form,
    field,
    label,
  }: any) => {
    const { name, value } = field;
    const { setFieldValue } = form;
    return (
      <Select
        label={label}
        name={name}
        value={parseInt(value)}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
  };

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
                id="no_txt"
                name="no_txt"
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
                เลขทะเบียน
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="no"
                name="no"
                startAdornment={
                  <SearchIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เลขทะเบียน"
                size="small"
                placeholder="ตัวอย่าง M65110077"
              />
            </FormControl>
          </Grid>
          <Grid item lg={3.5} md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="category">หมวดหมู่</InputLabel>
              <Field
                name="category"
                id="category"
                label="หมวดหมู่"
                component={CustomizedSelectForFormikV2}
              >
                <MenuItem value={0}>-- เลือกหมวดหมู่ --</MenuItem>
                {categoryReducer.isResult
                  ? categoryReducer.isResult.map((row, i) => {
                      return (
                        <MenuItem
                          value={parseInt(row.category_id)}
                          key={`category-${i}`}
                        >
                          {row.category_name}
                        </MenuItem>
                      );
                    })
                  : []}
              </Field>
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
                  className="hover:text-[#fce805] w-[28px] ml-2"
                  size="small"
                  onClick={() => {
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
    dispatch(categoryAll());
    dispatch(productSearch({ search: initialValues }));
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
        console.log(values.category);
        dispatch(productSearch({ search: values }));
        setSubmitting(false);
      }}
    >
      {(props) => showFormSearch(props)}
    </Formik>
  );
}
