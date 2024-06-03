import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { AlertContext } from "src/hooks/Context/AlertContext";
import {
  findBoardSectionContainer,
  getAuthorityById,
  initializeContainer,
} from "src/utils/dnd/service";
import { handleSubmitUserAuths } from "src/utils/users/users";
import DraggableServiceItem from "./DraggableServiceItem";
import ServiceContainer from "./ServiceContainer";
const dropAnimation = {
  ...defaultDropAnimation,
};
const DNDServicesModal = ({
  authorities,
  handleCloseServicesModal,
  userData,
  setAuthorities,
  setTableData,
  tableData,
}) => {
  const initialContainersSections = initializeContainer(authorities);
  const [containerSections, setContainerSections] = useState(
    initialContainersSections
  );
  const [activeAuthorityId, setActiveAuthorityId] = useState(null);
  const { setAlert } = useContext(AlertContext);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveAuthorityId(active.id);
  };

  const handleDragOver = ({ active, over }) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      containerSections,
      active.id
    );
    const overContainer = findBoardSectionContainer(containerSections, over.id);
    console.log(overContainer);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setContainerSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          containerSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findBoardSectionContainer(
      containerSections,
      active.id
    );
    const overContainer = findBoardSectionContainer(
      containerSections,
      over?.id
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = containerSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = containerSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setContainerSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveAuthorityId(null);
  };
  const authority = activeAuthorityId
    ? getAuthorityById(authorities, activeAuthorityId)
    : null;

  return (
    <Grid
      container
      item
      maxHeight={"85vh"}
      sx={{ overflowY: "scroll" }}
      gap={4}
    >
      <Grid container item p={4} gap={4}>
        <Grid item>
          <Typography variant="h4" fontWeight={"bold"}>
            Edit User Services
          </Typography>
        </Grid>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <Grid
            container
            item
            flexWrap={"nowrap"}
            alignItems={"flex-start"}
            gap={8}
            marginBottom={8}
            sx={{ overflowX: "clip" }}
          >
            {Object.keys(containerSections).map((containerSectionKey) => (
              <Grid key={containerSectionKey} container item xs={6}>
                <ServiceContainer
                  key={containerSectionKey}
                  authority={authority}
                  id={containerSectionKey}
                  title={containerSectionKey}
                  authorities={containerSections[containerSectionKey]}
                />
              </Grid>
            ))}
          </Grid>
          <DragOverlay dropAnimation={dropAnimation}>
            {authority ? <DraggableServiceItem authority={authority} /> : null}
          </DragOverlay>
        </DndContext>
      </Grid>
      <Box
        position={"sticky"}
        width={"100%"}
        bgcolor={"#f6f6f6"}
        height={65}
        bottom={0}
        px={4}
        display={"flex"}
        zIndex={999}
        alignItems={"center"}
        sx={{
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      >
        <Grid container item justifyContent={"space-between"} gap={4}>
          <Grid item xs={12} md={4}>
            <Button
              onClick={handleCloseServicesModal}
              fullWidth
              variant="contained"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              onClick={() =>
                handleSubmitUserAuths({
                  requestAction: "UPDATE_USER_AUTHORITIES",
                  setAlert,
                  userId: userData[0],
                  handleClose: handleCloseServicesModal,
                  containerSections,
                  setTableData,
                  tableData,
                })
              }
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default DNDServicesModal;
