import { Avatar, Card, ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  User,
  useGetAllUsersLazyQuery,
  useUpdateUserRoleMutation,
} from "../../../generated/userGraphql";
import { useStyles } from "./styles";

interface Column {
  id: string;
  title: string;
  users: User[];
}

const DndBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [getAllUsers, { data }] = useGetAllUsersLazyQuery({
    fetchPolicy: "network-only",
  });
  const [updateUserRole] = useUpdateUserRoleMutation();

  useEffect(() => {}, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  // TODO: let the backend return the filtered groups instead, frontend only needs to structure column shape and replace with backend data?
  useEffect(() => {
    if (data && data.getAllUsers) {
      const frontendUsers: User[] = data?.getAllUsers?.filter((user) =>
        user.role.includes("frontend")
      );
      const backendUsers: User[] = data?.getAllUsers?.filter((user) =>
        user.role.includes("backend")
      );
      const operationUsers: User[] = data?.getAllUsers?.filter((user) =>
        user.role.includes("operation")
      );
      const productUsers: User[] = data?.getAllUsers?.filter((user) =>
        user.role.includes("product")
      );
      const otherUsers: User[] = data?.getAllUsers?.filter((user) =>
        user.role.includes("others")
      );
      const newColumns: Column[] = [
        {
          id: "frontend",
          title: "Frontend",
          users: frontendUsers,
        },
        {
          id: "backend",
          title: "Backend",
          users: backendUsers,
        },
        {
          id: "operations",
          title: "Operations",
          users: operationUsers,
        },
        {
          id: "product",
          title: "Product",
          users: productUsers,
        },
        {
          id: "others",
          title: "Others",
          users: otherUsers,
        },
      ];
      setColumns(newColumns);
    }
  }, [data]);

  // TODO: handle errors in backend (and response type)
  const handleUpdate = (id: string, role: string) => {
    console.log(id);
    console.log(role);
    updateUserRole({
      variables: {
        id,
        role,
      },
    });
  };

  // handle drag and drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return; // Not a valid drop

    const sourceColumn = columns.find(
      (col) => col.id === result.source.droppableId
    );
    const destinationColumn = columns.find(
      (col) => col.id === result.destination?.droppableId
    );

    if (!sourceColumn || !destinationColumn) return;

    const draggedUser = sourceColumn.users[result.source.index];

    // Check if the item was dropped in the same column
    if (sourceColumn.id === destinationColumn.id) {
      // Reorder the users within the same column without making a backend call
      const updatedUsers = [...sourceColumn.users];
      updatedUsers.splice(result.source.index, 1);
      updatedUsers.splice(result.destination.index, 0, draggedUser);

      // Update the columns with the reordered users
      const updatedColumns = columns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, users: updatedUsers };
        }
        return col;
      });

      setColumns(updatedColumns);
    } else {
      // Update user role in the backend for a different column
      // onUpdateUserRole(draggedUser.id, destinationColumn.title);
      handleUpdate(draggedUser.userId, destinationColumn.id);

      // Remove the user from the source column
      const updatedSourceUsers = [...sourceColumn.users];
      updatedSourceUsers.splice(result.source.index, 1);

      // Add the user to the destination column
      const updatedDestinationUsers = [...destinationColumn.users];
      updatedDestinationUsers.splice(result.destination.index, 0, draggedUser);

      // Update the columns
      const updatedColumns = columns.map((col) => {
        if (col.id === sourceColumn.id) {
          return { ...col, users: updatedSourceUsers };
        } else if (col.id === destinationColumn.id) {
          return { ...col, users: updatedDestinationUsers };
        }
        return col;
      });

      setColumns(updatedColumns);
    }
  };

  const { classes } = useStyles();

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.wrapper}>
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div className={classes.droppable}>
                  <div className={classes.title}>
                    {column.title.toLocaleUpperCase()}
                  </div>
                  <ScrollArea
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={classes.draggableContainer}
                  >
                    {column.users.map((user, index) => (
                      <Draggable
                        key={user.userId}
                        draggableId={user.userId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card className={classes.draggableCard}>
                              <div>
                                {user.username}
                                <div>@{column.id}</div>
                              </div>
                              <Avatar src={user.image} radius="xl" />
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ScrollArea>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default DndBoard;
