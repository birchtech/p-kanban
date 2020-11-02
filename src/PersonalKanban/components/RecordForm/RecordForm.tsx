import React from "react";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";

import { Record } from "PersonalKanban/types";
import { RecordColor } from "PersonalKanban/enums";
import Radio from "PersonalKanban/components/Radio";

type RecordFormProps = {
  record: Partial<Record>;
  onSubmit: any;
  disabled?: boolean;
  formTitle?: string;
};

const RecordForm: React.FC<RecordFormProps> = (props) => {
  const { record, disabled, formTitle, onSubmit } = props;

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: Object.assign({}, record),
    onSubmit: (values) => {
      onSubmit && onSubmit(values);
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.title) {
        errors.title = "Title is required.";
      }
      return errors;
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h6">
            {formTitle}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            value={values.title}
            error={Boolean(errors.title)}
            helperText={errors.title}
            disabled={disabled}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={3}
            name="description"
            label="Description"
            value={values.description}
            error={Boolean(errors.description)}
            helperText={errors.description}
            disabled={disabled}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Background</FormLabel>
            <RadioGroup
              row
              aria-label="background"
              name="color"
              value={values.color}
              onChange={handleChange}
            >
              {Object.keys(RecordColor).map((value) => (
                <Radio key={value} value={value} color={value} />
              ))}
              <Radio key="default" value="" color="" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" disabled={disabled}>
            Cancel
          </Button>
          &nbsp;
          <Button color="primary" variant="contained" disabled={disabled}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

RecordForm.defaultProps = {
  formTitle: "Add Record",
};

export default RecordForm;