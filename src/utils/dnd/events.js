import { arrayMove } from "@dnd-kit/sortable";
function debounce(func, delay) {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}
export function onDragStart(event, setActiveAuthority) {
  setActiveAuthority(event.active.data.current.authority);
  return;
}

export function onDragOver(event, setAuthorities) {
  const { active, over } = event;
  if (!over) return;
  const debouncedSetAuthorities = debounce(setAuthorities, 150);

  const activeId = active.id;
  const overId = over.id;
  if (activeId == overId) return;

  const isActiveATask = active.data.current?.type === "authority";
  const isOverATask = over.data?.current?.type === "authority";
  // if (!isActiveATask) return;

  // Im dropping a Task over another Task
  if (isActiveATask && isOverATask) {
    debouncedSetAuthorities((authorities) => {
      const activeIndex = authorities.findIndex(
        (auth) => String(auth.authId) === activeId
      );
      const overIndex = authorities.findIndex(
        (auth) => String(auth.authId) === overId
      );
      authorities[activeIndex].containerValue =
        authorities[overIndex].containerValue;
      console.log(arrayMove(authorities, activeIndex, overIndex));
      return arrayMove(authorities, activeIndex, overIndex);
    });
  }
  // Im dropping a Task over a container
  const draggedContainer = active.data?.current?.authority?.containerValue;
  const overContainer = over.data?.current?.authority?.containerValue;
  if (draggedContainer !== overContainer) {
    debouncedSetAuthorities((authorities) => {
      const activeIndex = authorities.findIndex(
        (auth) => String(auth?.authId) === activeId
      );
      authorities[activeIndex].containerValue = overContainer;

      return arrayMove(authorities, activeIndex, activeIndex);
    });
  }
}
export function onDragEnd(event, setActiveContainer, setActiveAuthority) {
  setActiveContainer(null);
  setActiveAuthority(null);
  const { active, over } = event;
  if (!over) return;

  const activeId = active.id;
  const overId = over.id;

  if (activeId == overId) return;
}
// Usage:
const handleDragOver = ({ active, over }) => {
  // Find the containers
  const activeContainer = findBoardSectionContainer(boardSections, active.id);
  const overContainer = findBoardSectionContainer(boardSections, over?.id);

  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    return;
  }

  setBoardSections((boardSection) => {
    const activeItems = boardSection[activeContainer];
    const overItems = boardSection[overContainer];

    // Find the indexes for the items
    const activeIndex = activeItems.findIndex((item) => item.id === active.id);
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
        boardSections[activeContainer][activeIndex],
        ...boardSection[overContainer].slice(
          overIndex,
          boardSection[overContainer].length
        ),
      ],
    };
  });
};
