import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  IconButton,
  Divider,
} from "@mui/material";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import QuickQuotationStep4 from "./QuickQuotationStep4";

const QuickQuotationStep3 = () => {
  const [showStep4, setShowStep4] = useState(false);

  const validationSchema = Yup.object().shape({
    days: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        dayNote: Yup.string().required("Day Note is required"),
        aboutCity: Yup.string().nullable(),
        image: Yup.mixed().required("Image is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      days: [
        {
          title: "",
          dayNote: "",
          aboutCity: "",
          image: null,
        },
      ],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      alert("Form submitted successfully!");
    },
  });

  if (showStep4) {
      return <QuickQuotationStep4 />;
    }

  return (
    <FormikProvider value={formik}>
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          mt: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Quotation
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="days"
            render={(arrayHelpers) => (
              <>
                {formik.values.days.map((day, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      p: 2,
                      mb: 3,
                      position: "relative",
                    }}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 2 }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#333" }}
                      >
                        {`Day ${index + 1} Itinerary`}
                      </Typography>

                      {index > 0 && (
                        <IconButton
                          color="error"
                          onClick={() => arrayHelpers.remove(index)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Grid>

                    {/* Title */}
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="Title"
                        name={`days[${index}].title`}
                        size="small"
                        value={formik.values.days[index].title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.days?.[index]?.title &&
                          Boolean(formik.errors.days?.[index]?.title)
                        }
                        helperText={
                          formik.touched.days?.[index]?.title &&
                          formik.errors.days?.[index]?.title
                        }
                      />
                    </Box>

                    {/* Info Alert */}
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Sightseeing locations are not available for this city. You
                      can add sightseeing details in the Day Note section below.
                    </Alert>

                    {/* Day Note */}
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="Day Note"
                        name={`days[${index}].dayNote`}
                        size="small"
                        multiline
                        minRows={3}
                        value={formik.values.days[index].dayNote}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.days?.[index]?.dayNote &&
                          Boolean(formik.errors.days?.[index]?.dayNote)
                        }
                        helperText={
                          formik.touched.days?.[index]?.dayNote &&
                          formik.errors.days?.[index]?.dayNote
                            ? formik.errors.days[index].dayNote
                            : `You have written ${formik.values.days[
                                index
                              ].dayNote.length}/10000 characters`
                        }
                      />
                    </Box>

                    {/* About City */}
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="About City"
                        name={`days[${index}].aboutCity`}
                        size="small"
                        multiline
                        minRows={2}
                        value={formik.values.days[index].aboutCity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={`You have written ${formik.values.days[
                          index
                        ].aboutCity.length}/10000 characters`}
                      />
                    </Box>

                    {/* Image Upload */}
                    <Box mb={2}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Select Day {index + 1} Image (For best view Image size –
                        430px X 185px)
                      </Typography>
                      <input
                        id={`days[${index}].image`}
                        name={`days[${index}].image`}
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          formik.setFieldValue(
                            `days[${index}].image`,
                            event.currentTarget.files[0]
                          )
                        }
                      />
                      {formik.touched.days?.[index]?.image &&
                        formik.errors.days?.[index]?.image && (
                          <Typography
                            color="error"
                            variant="caption"
                            sx={{ display: "block" }}
                          >
                            {formik.errors.days[index].image}
                          </Typography>
                        )}
                    </Box>
                  </Box>
                ))}

                {/* Add Day Button */}
                <Box textAlign="center" mb={3}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      arrayHelpers.push({
                        title: "",
                        dayNote: "",
                        aboutCity: "",
                        image: null,
                      })
                    }
                  >
                    + Add Day
                  </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Submit Button */}
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block", mb: 2 }}
                >
                  * Fields Are Mandatory
                </Typography>

                <Grid container justifyContent="center">
                  <Button
                           variant="contained"
                           sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                           onClick={() => setShowStep4(true)}
                         >
                           Save & Continue
                         </Button>
                </Grid>
              </>
            )}
          />
        </form>
      </Box>
    </FormikProvider>
  );
};

export default QuickQuotationStep3;
