import React, { useEffect, useRef } from "react";
// @form
import { Formik, Form, Field } from "formik";
// @mui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

// @type
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// @icons

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";

import { BootstrapDialog } from "@/styles/AppStyle";
// @redux
import { useSelector, useDispatch } from "react-redux";

import { categorySelector, categoryAll } from "@/store/slices/categorySlice";
import {
  equipmentCartSelector,
  addEquipmentCart,
  updateEquipmentCartEdit,
} from "@/store/slices/equipmentCartSlice";

import {
  equipmentDetailSelector,
  equipmentDetailAdd,
  equipmentDetailAll,
} from "@/store/slices/equipmentDetailSlice";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle
      sx={{
        mt: 0,
        p: "2px",
        height: 40,
        backgroundColor: "#36474f",
        color: "#fff",
        textAlign: "center",
      }}
      {...other}
    >
      {children}
    </DialogTitle>
  );
};

export default function EquipmentCartForm({
  show,
  confirm,
  equipment_id,
}: any) {
  const formRefProduct = useRef<any>();

  const dispatch = useDispatch<any>();

  const categoryReducer = useSelector(categorySelector);
  const equipmentCartReducer = useSelector(equipmentCartSelector);

  const initialValues: any = {
    equipment_id: equipment_id,
    id: "",
    equipment_detail_title: "", // รายการ
    equipment_detail_category: 0, // หมวดหมู่รหัส *
    equipment_detail_category_name: "", // หมวดหมู่ชื่อ *
    equipment_detail_material_type: "empty", // ชนิดวัสดุ *
    equipment_detail_qty: "", // จำนวน
    equipment_detail_price: "", // ราคาต่อหน่วย
    equipment_detail_note: "", // รายละเอียด
  };

  const initialEditValues = (values) => {
    // ตั้งค่าข้อมูลพื้นฐาน ฟอร์ม
    let initailObj = initialValues;
    if (values) {
      // มีการแก้ไข้ข้อมูล
      values.map((res) => {
        initailObj["equipment_id"] = equipment_id;
        initailObj["id"] = res.equipment_detail_id;
        initailObj["equipment_detail_title"] = res.equipment_detail_title;
        initailObj["equipment_detail_category"] = parseInt(
          res.equipment_detail_category
        );
        initailObj["equipment_detail_category_name"] = res.category_name;
        initailObj["equipment_detail_material_type"] =
          res.equipment_detail_material_type;
        initailObj["equipment_detail_qty"] = parseInt(res.equipment_detail_qty);
        initailObj["equipment_detail_price"] = parseInt(
          res.equipment_detail_price
        );
        initailObj["equipment_detail_note"] = res.equipment_detail_note;
        return initailObj;
      });
    }
    return initailObj;
  };

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

  const handleProductSubmit = () => {
    if (formRefProduct.current) {
      formRefProduct.current.handleSubmit();
    }
  };

  const resetProductForm = () => {
    if (formRefProduct.current) {
      formRefProduct.current.resetForm();
    }
  };

  // บันทึกรายการ อุปกรณ์
  const showForm = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
    resetForm,
    values,
    errors,
    touched,
  }: any) => {
    return (
      <Form noValidate>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            pt: "16px",
            px: "16px",
          }}
        >
          <Grid item xs={12}>
            <FormControl
              fullWidth
              size="small"
              required
              error={
                errors.equipment_detail_title &&
                touched.equipment_detail_title &&
                true
              }
            >
              <InputLabel htmlFor="equipment_detail_title">
                ชื่อรายการ
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_detail_title"
                name="equipment_detail_title"
                label="ชื่อรายการ"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="กรอก ชื่อรายการ"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              size="small"
              required
              error={
                errors.equipment_detail_category &&
                touched.equipment_detail_category &&
                true
              }
            >
              <InputLabel id="equipment_detail_category">หมวดหมู่</InputLabel>
              <Field
                name="equipment_detail_category"
                id="equipment_detail_category"
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
                          onClick={() => {
                            // เซตชื่อหมวดหมู่
                            setFieldValue(
                              "equipment_detail_category_name",
                              row.category_name
                            );
                          }}
                        >
                          {row.category_name}
                        </MenuItem>
                      );
                    })
                  : []}
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl
              fullWidth
              size="small"
              required
              error={
                errors.equipment_detail_material_type &&
                touched.equipment_detail_material_type &&
                true
              }
            >
              <InputLabel id="equipment_detail_material_type">
                ชนิดวัสดุ/ครุภัณฑ์{" "}
              </InputLabel>
              <Field
                name="equipment_detail_material_type"
                id="equipment_detail_material_type"
                label="ชนิดวัสดุ/ครุภัณฑ์ "
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={"empty"}>-- ชนิดวัสดุ/ครุภัณฑ์ --</MenuItem>
                <MenuItem value="วัสดุ-มีเลขครุภัณฑ์">
                  พัสดุ-มีเลขครุภัณฑ์
                </MenuItem>
                <MenuItem value="วัสดุ-ไม่มีเลขครุภัณฑ์">
                  วัสดุ-ไม่มีเลขครุภัณฑ์
                </MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl
              fullWidth
              size="small"
              required
              error={
                errors.equipment_detail_qty &&
                touched.equipment_detail_qty &&
                true
              }
            >
              <InputLabel htmlFor="equipment_detail_qty">จำนวน</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_detail_qty"
                name="equipment_detail_qty"
                type="number"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                label="จำนวน"
                size="small"
                placeholder="กรอก จำนวน"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl
              fullWidth
              size="small"
              required
              error={
                errors.equipment_detail_price &&
                touched.equipment_detail_price &&
                true
              }
            >
              <InputLabel id="equipment_detail_price">ราคาต่อหน่วย</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_detail_price"
                name="equipment_detail_price"
                label="ราคาต่อหน่วย"
                size="small"
                type="number"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="กรอก ราคาต่อหน่วย"
              />
            </FormControl>
          </Grid>

          <Grid item lg={12} md={12} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="equipment_detail_note">
                รายละเอียด
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_detail_note"
                name="equipment_detail_note"
                size="small"
                label="รายละเอียด"
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
  };

  useEffect(() => {
    dispatch(categoryAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <BootstrapDialog
      maxWidth="md"
      open={show}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <BootstrapDialogTitle
        id="alert-dialog-slide-title"
        onClose={() => confirm(false)}
      >
        {/* {JSON.stringify(equipmentCartReducer.isResultEdit)} */}
        <Typography variant="subtitle1" component={"b"}>
          แก้รายการอุปกรณ์ : {equipment_id}
          {/* {equipmentCartReducer.isResultEdit
            ? equipmentCartReducer.isResultEdit.map(
                (res) => res.equipment_detail_id
              )
            : 0} */}
        </Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Formik
          innerRef={formRefProduct}
          validate={(values) => {
            let errors: any = {};

            if (!values.equipment_detail_title)
              errors.equipment_detail_title = "กรอกชื่อรายการ";

            if (values.equipment_detail_category === "empty")
              errors.equipment_detail_category = "เลือกหมวดหมู่";

            if (values.equipment_detail_material_type === "empty")
              errors.equipment_detail_material_type = "เลือกชนิดวัสดุ";

            if (
              !values.equipment_detail_qty ||
              values.equipment_detail_qty <= 0
            )
              errors.equipment_detail_qty = "กรอกจำนวน";

            if (
              !values.equipment_detail_price ||
              values.equipment_detail_price <= 0
            )
              errors.equipment_detail_price = "กรอกราคาต่อหน่วย";

            return errors;
          }}
          enableReinitialize
          initialValues={
            equipmentCartReducer.isResultEdit
              ? initialEditValues(equipmentCartReducer.isResultEdit)
              : initialValues
          }
          onSubmit={(values, { setSubmitting }) => {
            if (equipmentCartReducer.isResultEdit.length !== 0) {
              // dispatch(
              //   updateEquipmentCartEdit({
              //     id: values.id,
              //     equipment_detail_title: values.equipment_detail_title,
              //     equipment_detail_category: values.equipment_detail_category,
              //     equipment_detail_category_name:
              //       values.equipment_detail_category_name,
              //     equipment_detail_material_type:
              //       values.equipment_detail_material_type,
              //     equipment_detail_qty: values.equipment_detail_qty,
              //     equipment_detail_price: values.equipment_detail_price,
              //     equipment_detail_price_total:
              //       values.equipment_detail_qty * values.equipment_detail_price,
              //     equipment_detail_note: values.equipment_detail_note,
              //   })
              // );
            } else {
              console.log(values);
              let formData = new FormData();
              formData.append("equipment_id", values.equipment_id);
              formData.append(
                "equipment_detail_title",
                values.equipment_detail_title
              );
              formData.append(
                "equipment_detail_category",
                values.equipment_detail_category
              );
              formData.append(
                "equipment_detail_material_type",
                values.equipment_detail_material_type
              );
              formData.append(
                "equipment_detail_qty",
                values.equipment_detail_qty
              );
              formData.append(
                "equipment_detail_price",
                values.equipment_detail_price
              );

              const equipment_detail_price_total =
                values.equipment_detail_qty * values.equipment_detail_price;
              console.log(equipment_detail_price_total);
              formData.append(
                "equipment_detail_price_total",
                `${equipment_detail_price_total}`
              );
              formData.append(
                "equipment_detail_note",
                values.equipment_detail_note
              );
              dispatch(equipmentDetailAdd({ formData: formData }));
              dispatch(equipmentDetailAll({ search: equipment_id }));
              // dispatch(
              //   equipmentDetailAdd({})
              // );
            }

            setSubmitting(false);
            // รีเซตฟอร์ม
            resetProductForm();
            // ปิด ฟอร์ม
            confirm(false);
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </DialogContent>
      <DialogActions
        sx={{
          paddingRight: 24,
        }}
      >
        <Button
          onClick={() => {
            // ปิด ฟอร์ม
            confirm(false);
            // รีเซต ฟอร์ฒ
            resetProductForm();
          }}
          variant="contained"
          color="error"
          className="w-[96px] "
        >
          <CloseTwoToneIcon /> ปิด
        </Button>

        <Button
          variant="contained"
          color="success"
          className="w-[128px] "
          onClick={() => {
            handleProductSubmit();
          }}
        >
          <DoneTwoToneIcon />
          ตกลง
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
