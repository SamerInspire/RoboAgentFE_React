import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Grid, Typography } from "@mui/material";
import { glassMorphisimStyle } from "src/styles/styles";
import DraggableServiceItem from "./DraggableServiceItem";

function ServiceContainer({ id, title, container, index, authorities }) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: id,
    data: {
      type: "container",
      container,
    },
  });

  return (
    <Grid
      container
      item
      xs={12}
      md={6}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      height={"100%"}
      alignItems={"flex-start"}
      sx={{ ...glassMorphisimStyle }}
    >
      <Grid
        container
        item
        justifyContent={"center"}
        py={2}
        borderBottom={"3px solid"}
        sx={{ borderBottomColor: index == 1 ? "blue.main" : "primary.main" }}
      >
        <Typography
          fontWeight={600}
          variant="h5"
          color={index == 1 ? "blue.main" : "primary.main"}
        >
          {title}
        </Typography>
      </Grid>
      <Grid
        container
        item
        p={4}
        bgcolor={"#f6f6f6"}
        minHeight={"200px"}
        alignItems={"flex-start"}
      >
        <Grid container item gap={8}>
          <SortableContext items={authorities}>
            {authorities?.map((authority, index) => (
              <DraggableServiceItem
                key={authority.name + index}
                authority={authority}
                index={container.id}
              />
            ))}
          </SortableContext>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ServiceContainer;
