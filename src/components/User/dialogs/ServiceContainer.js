import { DragOverlay, useDroppable, defaultDropAnimation } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Grid, Typography } from "@mui/material";
import SortableTaskItem from "src/components/dnd/SortableTaskItem";
import { glassMorphisimStyle } from "src/styles/styles";
import DraggableServiceItem from "./DraggableServiceItem";

function ServiceContainer({ id, title, authorities }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Grid
      container
      item
      alignItems={"flex-start"}
      sx={{ ...glassMorphisimStyle }}
    >
      <Grid
        container
        item
        justifyContent={"center"}
        py={2}
        borderBottom={"3px solid"}
        borderColor={id == "all_services" ? "blue.main" : "primary.main"}
      >
        <Typography
          fontWeight={600}
          variant="h5"
          color={id == "all_services" ? "blue.main" : "primary.main"}
        >
          {title.split("_").join(" ").toUpperCase()}
        </Typography>
      </Grid>
      <Grid
        container
        item
        p={4}
        bgcolor={"#f6f6f6"}
        alignItems={"flex-start"}
        minHeight={"200px"}
        gap={4}
        ref={setNodeRef}
      >
        <SortableContext
          id={id}
          strategy={verticalListSortingStrategy}
          items={authorities}
        >
          {authorities?.map((authority) => (
            <SortableTaskItem
              key={authority.id}
              id={authority.id}
              containerId={id}
              authority={authority}
            >
              <DraggableServiceItem authority={authority} />
            </SortableTaskItem>
          ))}
        </SortableContext>
      </Grid>
    </Grid>
  );
}

export default ServiceContainer;
