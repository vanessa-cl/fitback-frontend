import { FormWrapper } from "./FormLayout.styles";

function FormLayout({ children, onSubmit }) {
  return <FormWrapper onSubmit={onSubmit}>{children}</FormWrapper>;
}
export default FormLayout;
