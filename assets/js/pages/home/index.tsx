import React, { useState } from "react";

import { makeStyles } from "@material-ui/styles";

import { useQuery } from "@apollo/react-hooks";

import { GET_SELF } from "../../gql/query";
import { TodoList } from "./todo-list";
import { FolderList } from "./folder-list";

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    minHeight: "100vh",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid #eee",
  },
  logoutButton: {
    cursor: "pointer",
  },
});

export default function HomePage({ logout }: { logout: () => void }) {
  const { container, sidebar, logoutButton } = useStyles();

  const [selected, setSelected] = useState("");

  const { data } = useQuery<{ self: User }>(GET_SELF);

  const folders = data?.self.folders ?? [];
  const folder = folders.find(({ id }) => selected === id);

  return (
    <div className={container}>
      <div className={sidebar}>
        <FolderList
          folders={folders}
          selected={selected}
          onChange={setSelected}
        />
        <List subheader={<ListSubheader>Profile</ListSubheader>}>
          <Divider />
          <ListItem className={logoutButton} onClick={logout}>
            <ListItemAvatar>
              <Avatar>
                <PowerSettingsNew color="error" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
      <TodoList folder={folder} />
    </div>
  );
}
