export type ActionInfo = {
  title: string;
  description: string;
};

export interface ToolTips<T> {
  [key: string]: T;
}

export const appInfo = {
  title: "Utilz",
  author: "Naruse Nia",
  description: "A some utility tools for After Effects",
};

export const mainToolTips: ToolTips<ActionInfo> = {
  bound_it: {
    title: "BoundIt",
    description: "Create bounding box things ;)",
  },
  link_above: {
    title: "Link above",
    description: "Link above layer",
  },
  apply_expression: {
    title: "Apply expression",
    description: "Apply an expression to the selected layers",
  },
  create_camera_controller: {
    title: "Create camera controller",
    description: "Create a new camera controller",
  },
  separate_dimensions: {
    title: "Separate dimensions",
    description: "Separate dimensions the selected layers",
  },
  expression_editor: {
    title: "Expression editor",
    description: "Open the expression editor",
  },
};
