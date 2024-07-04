import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grid } from "@mui/material";

const SortableTaskItem = ({ children, id, authority, containerId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: authority });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderRadius: 15,
    position: "relative",
    zIndex: isDragging ? 9 : "auto",
    backgroundColor: isDragging
      ? containerId == "all_services"
        ? "rgb(4, 41, 122)"
        : "rgb(0, 82, 73)"
      : "inherit",
    color: isDragging
      ? "white"
      : containerId == "all_services"
      ? "rgb(4, 41, 122)"
      : "rgb(0, 82, 73)",
    opacity: isDragging ? "50%" : "100%",
  };

  return (
    <Grid
      container
      item
      ref={setNodeRef}
      zIndex={999}
      style={{ ...style }}
      {...attributes}
      {...listeners}
    >
      {children}
    </Grid>
  );
};

export default SortableTaskItem;
