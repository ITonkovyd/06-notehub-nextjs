import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { createNote } from '@/lib/api';


import css from './NoteForm.module.css';
import type { BaseNoteParams } from '@/types/note';
import { useNoteMutation } from '@/hooks/useNoteMutation';

interface NoteFormProps {
  onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const formValidationSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!')
     .max(50, 'Too Long!').required("Title is required"),
    content: Yup.string().max(500, 'Too Long!').required("Content is required"),
    tag: Yup.string().oneOf(["Work", "Personal", "Shopping", "Meeting", "Todo"]).required("Tag is required")
  });

  const createNoteMutation = useNoteMutation({
    mutationFn: (values: BaseNoteParams) => createNote(values),
    queryKey: ["notes"],
    successMsg: "Note created successfully",
    errorMsg: "Error creating note"
  });

  const handleSubmitForm = (values: BaseNoteParams) => {
    createNoteMutation.mutate(values);
    onClose();
  };

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={formValidationSchema}
      onSubmit={handleSubmitForm}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title">
            {errorMsg => <span className={css.error}>{errorMsg}</span>}
          </ErrorMessage>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content">
            {errorMsg => <span className={css.error}>{errorMsg}</span>}
          </ErrorMessage>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag">
            {errorMsg => <span className={css.error}>{errorMsg}</span>}
          </ErrorMessage>
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={false}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;