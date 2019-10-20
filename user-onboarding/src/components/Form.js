import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";

const RedoForm = ({ errors, touched, values, status }) => {
  const [things, setThings] = useState([]);
  useEffect(() => {
    status && setThings(things => [...things, status]);
  }, [status]);

  return (
    <div>
      <h1>Things Form</h1>
      <Form>
        <Field type="text" name="what" placeholder="What" />
        {touched.what && errors.what && (
          <p className="error">{errors.what}</p>
        )}

        <Field type="text" name="where" placeholder="Where" />
        {touched.where && errors.where && <p className="error">{errors.where}</p>}

        <Field component="select" className="when" name="when">
          <option>Please Choose an Option</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
        </Field>
        {touched.when && errors.when && <p className="error">{errors.when}</p>}
        <label className="checkbox-container">
          {" "}
          okay
          <Field
            type="checkbox"
            name="okay"
            checked={values.okay}
          />
          <span className="checkmark" />
        </label>

        <Field
          component="textarea"
          type="text"
          name="notes"
          placeholder="Notes"
        />
        {touched.notes && errors.notes && (
          <p className="error">{errors.notes}</p>
        )}

        <button type="submit">Submit!</button>
      </Form>

      {things.map(thing => (
        <ul key={thing.id}>
          <li>What: {thing.what}</li>
          <li>Where: {thing.where}</li>
          <li>When: {thing.when}</li>
        </ul>
      ))}
    </div>
  );
};


const FormikRedoForm = withFormik({
  
  mapPropsToValues({ what, where, notes, when, okay }) {
    return {
      okay: okay || false,
      what: what || "",
      where: where || "",
      when: when || "",
      notes: notes || ""
    };
  },

  validationSchema: Yup.object().shape({
    what: Yup.string().required("Dont Touch!!!"),
    where: Yup.string().required(),
    notes: Yup.string(),
    when: Yup.string()
      .oneOf(["morning", "afternoon"])
      .required("Please choose one!")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
})(RedoForm); 
console.log("This is the HOC", FormikRedoForm);
export default FormikRedoForm;

// const personForm = () => {
     
//     return (
//         <div>
//           <h1>User</h1>
//           <Form>
//             <Field type="text" name="name" placeholder="Name" />
//             <ErrorMessage name="name" component="div" />
//             <Field type="text" name="email" placeholder="Email" />
           
//             <Field type="password" name="password" placeholder="Password" />

//             <label>
//                 {" "}
//                 Terms of Serivce
//                 <Field
//                     type="checkbox"
//                     name="terms"
//                 />
//             </label>
    
//             <button type="submit">Submit!</button>
//           </Form>
        
//         </div>      
//     );
// };

// const FormikPersonForm = withFormik({})(personForm);

// export default FormikPersonForm;