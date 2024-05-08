import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useState } from "react";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import {
  findBoardSectionContainer,
  getAuthorityById,
  initializeContainer,
} from "src/utils/dnd/service";
import { handleSubmitUserAuths } from "src/utils/users/users";
import ServiceContainer from "./ServiceContainer";

const DNDServicesModal = ({
  authorities,
  handleCloseServicesModal,
  userData,
}) => {
  const initialContainersSections = initializeContainer(authorities);
  const [containerSections, setContainerSections] = useState(
    initialContainersSections
  );
  const [activeAuthorityId, setActiveAuthorityId] = useState(null);
  const setAlertInfo = useUpdateAlert();
  const sensors = useSensors(
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
      sx={{ overflowY: "scroll", overflowX: "clip" }}
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
            gap={12}
          >
            {Object.keys(containerSections).map((containerSectionKey) => (
              <Grid container item xs={6}>
                <ServiceContainer
                  key={containerSectionKey}
                  id={containerSectionKey}
                  title={containerSectionKey}
                  authorities={containerSections[containerSectionKey]}
                  authority={authority}
                />
              </Grid>
            ))}
          </Grid>
          {/* <DragOverlay dropAnimation={dropAnimation}>
            {authority ? <DraggableServiceItem authority={authority} /> : null}
          </DragOverlay> */}
        </DndContext>
      </Grid>

      <Box
        position={"fixed"}
        bgcolor={"#f6f6f6"}
        height={65}
        width={"100%"}
        bottom={0}
        display={"flex"}
        px={4}
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
                  roboAuthorities: containerSections["active_services"],
                  requestAction: "UPDATE_USER_AUTHORITIES",
                  setAlertInfo,
                  userId: userData[0],
                  handleClose: handleCloseServicesModal,
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
