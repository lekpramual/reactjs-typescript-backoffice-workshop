import * as React from "react";
// @router
import { useNavigate } from "react-router-dom";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
// @redux
import { useSelector, useDispatch } from "react-redux";
// @form
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
// @type
import { User } from "@/types";

// @component
import Copyright from "@/layouts/Copyright";
// @seletor
import { loginSelector, loginUser } from "@/store/slices/loginSlice";

const SignInSide: React.FC<any> = () => {
  const loginReducer = useSelector(loginSelector);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const showFormV2 = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
  }: any) => {
    return (
      <Form noValidate>
        <FormControl required fullWidth>
          <Field
            required
            size="small"
            sx={{ mt: 3, mb: 2 }}
            component={TextField}
            id="username"
            name="username"
            type="text"
            label="ชื่อผู้ใช้งาน"
            autoFocus
          />
        </FormControl>

        <FormControl required fullWidth sx={{ mt: 6 }}>
          <Field
            required
            size="small"
            // style={{ marginTop: 16 }}
            // sx={{ mb: 2 }}
            component={TextField}
            id="password"
            name="password"
            type="password"
            label="รหัสผ่าน"
          />
        </FormControl>
        <LoadingButton
          fullWidth
          loading={loginReducer.isFetching}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          loadingIndicator="กำลังประมวลผล …"
          sx={{ mt: 3, mb: 2 }}
        >
          เข้าสู่ระบบ
        </LoadingButton>

        <Copyright sx={{ mt: 5 }} />
      </Form>
    );
  };

  const initialValues: User = { username: "", password: "", app: "22" };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${`${process.env.PUBLIC_URL}/assets/img/bg_reh.jpeg`})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ flexGrow: 1, mb: 1 }}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/logoReh.png`}
              alt="logo-reh"
              style={{ width: "128px", height: "128px" }}
            />
          </Box>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "primary.main" }}
          >
            REH Backoffice V {process.env.REACT_APP_VERSION}
          </Typography>
          <Formik
            validate={(values) => {
              let errors: any = {};
              if (!values.username) errors.username = "กรอกชื่อผู้ใช้งาน";
              if (!values.password) errors.password = "กรอกรหัสผ่าน";

              return errors;
            }}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              // alert(JSON.stringify(values));
              dispatch(loginUser({ user: values, navigate: navigate }));
              setSubmitting(false);
            }}
          >
            {(props) => showFormV2(props)}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
