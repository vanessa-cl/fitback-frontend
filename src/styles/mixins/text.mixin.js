import { css } from "styled-components";

// Mixin para texto de corpo principal
const primaryText = css`
  color: var(--color-text-primary);
  line-height: 1.6;
`;

// Mixin para links interativos
const link = css`
  color: var(--color-blue-medium);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: var(--color-blue-primary);
    text-decoration: underline;
  }
`;

// Mixin para texto secundário (placeholder, helper text, etc.)
const secondaryText = css`
  color: var(--color-blue-gray-medium);
  font-size: 0.9em;
`;

// Mixin para mensagens de sucesso
const successMessage = css`
  color: var(--color-green);
  font-size: 1em;
  font-weight: 600;
`;

// Mixin para mensagens de aviso ou erro
const warningMessage = css`
  color: var(--color-red);
  font-size: 1em;
  font-weight: 600;
`;

// Mixin para texto em negrito (para reutilização em outros mixins ou componentes)
const bold = css`
  font-weight: 700;
`;

export {
  primaryText,
  link,
  secondaryText,
  successMessage,
  warningMessage,
  bold,
};
