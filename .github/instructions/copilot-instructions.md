---
applyTo: "**/*.tsx"
description: React-TSX coding guidelines
---

Use the following guidelines when writing React components in TypeScript (TSX):

1. **Component Naming**: Use PascalCase for component names. For example, `MyComponent`.
2. **File Naming**: Name files with the same name as the component they export, using dashed-case. For example, `my-component.tsx`.
3. **Props Interface**: Define a separate interface for component props. For example:
   ```tsx
   interface MyComponentProps {
     title: string;
     isActive: boolean;
   }
   ```
4. **Functional Components**: Prefer functional components over class components. Use React hooks for state and lifecycle methods.
5. **Destructuring Props**: Destructure props in the function signature for better readability. For example:
   ```tsx
   const MyComponent: FC<MyComponentProps> = ({ title, isActive }) => {
     return <div>{title}</div>;
   };
   ```
6. **Default Props**: Use default parameters in the function signature instead of `defaultProps`. For example:
   ```tsx
   const MyComponent: FC<MyComponentProps> = ({
     title = "Default Title",
     isActive = false,
   }) => {
     return <div>{title}</div>;
   };
   ```
7. **Event Handlers**: Type event handlers explicitly. For example:
   ```tsx
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
     // handle click
   };
   ```
8. **Destructure imports**: Always destructure imports from React and other libraries. For example:
   ```tsx
   import { FC, useState } from "react";
   ```
9. **JSX Syntax**: Use self-closing tags for elements without children. For example, `<img />` instead of `<img></img>`.
10. **Styling**: Tailwind CSS is preferred for styling. Use className for applying styles. For example:

```tsx
<div className="bg-blue-500 text-white p-4">Hello World</div>
```

12. **Accessibility**: Always consider accessibility. Use semantic HTML and ARIA attributes where necessary.
13. **Comments**: Use comments to explain complex logic but avoid over-commenting. Keep comments concise and relevant.
14. **Testing**: Write unit tests for components using testing libraries like React Testing Library or Jest.
15. **Code Formatting**: Use Prettier for consistent code formatting. Ensure your code adheres to the project's linting rules.
16. **Avoid Inline Styles**: Do not use inline styles. Instead, use CSS classes or styled-components.
17. **State Management**: Use React's built-in state management with hooks. For complex state, consider using context.
18. **Avoid Any Type**: Avoid using the `any` type. Always strive to use specific types for props and state.
19. **Use Fragments**: Use React Fragments (`<>...</>`) to group multiple elements without adding extra nodes to the DOM.
20. **Memoization**: Use `memo` and `useCallback` to optimize performance for components that do not need to re-render frequently
21. **Null and undefined**: Prefer `null` over `undefined`.
22. **Consistent Return Types**: Ensure that your component consistently returns the same type (e.g., always return JSX or null).
23. **Avoid Nested Ternaries**: Avoid using nested ternary operators for better readability
