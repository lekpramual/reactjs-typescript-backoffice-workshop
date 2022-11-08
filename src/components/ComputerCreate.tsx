import React from "react";
// @form
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
// @mui
import {
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

// @icons
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

function ComputerCreate() {
  const CustomizedSelectForFormik = ({ children, form, field, label }: any) => {
    const { name, value } = field;
    const { setFieldValue } = form;
    return (
      <Select
        label={label}
        name={name}
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
  };

  return (
    <Form>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          pt: "16px",
          px: "16px",
        }}
      >
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-small-type">ยี่ห้อ</InputLabel>
            <Field
              name="type"
              id="type"
              label="ยี่ห้อ"
              component={CustomizedSelectForFormik}
            >
              <MenuItem value={0}>Lenovo</MenuItem>
            </Field>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-small-type">สเปก</InputLabel>
            <Field
              name="type"
              id="type"
              label="สเปก"
              component={CustomizedSelectForFormik}
            >
              <MenuItem value={0}>I 5</MenuItem>
            </Field>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-small-type">แรม</InputLabel>
            <Field
              name="type"
              id="type"
              label="แรม"
              component={CustomizedSelectForFormik}
            >
              <MenuItem value={0}>DDR4</MenuItem>
            </Field>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-small-type">ความจุแรม</InputLabel>
            <Field
              name="type"
              id="type"
              label="ความจุแรม"
              component={CustomizedSelectForFormik}
            >
              <MenuItem value={0}>2 GB</MenuItem>
            </Field>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-small-type">ฮาร์ดดิสก์</InputLabel>
            <Field
              name="type"
              id="type"
              label="ฮาร์ดดิสก์"
              component={CustomizedSelectForFormik}
            >
              <MenuItem value={0}>SSD</MenuItem>
            </Field>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="select-small-type">ความจุฮาร์ดดิสก์</InputLabel>
            <Field
              name="type"
              id="type"
              label="ความจุฮาร์ดดิสก์"
              component={CustomizedSelectForFormik}
            >
              <MenuItem value={0}>250 GB</MenuItem>
            </Field>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            mb: 2,
          }}
        >
          <FormControl fullWidth size="small">
            <InputLabel htmlFor="outlined-adornment-keyword">
              รายละเอียดเพิ่มเติม
            </InputLabel>
            <Field
              as={OutlinedInput}
              id="keyword"
              name="keyword"
              size="small"
              label="รายละเอียดเพิ่มเติม"
              startAdornment={
                <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
              }
              placeholder="รายละเอียดเพิ่มเติม"
            />
          </FormControl>
        </Grid>
      </Grid>
    </Form>
  );
}

export default ComputerCreate;
