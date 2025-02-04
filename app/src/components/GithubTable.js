import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Avatar,
} from "@material-ui/core";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  table_dark: {
    minWidth: 500,
    backgroundColor: "Black",
    border: "2px solid White",
    borderRadius: "10px",
  },
});

export const GithubTable = ({
  darkmode,
  githubUsers,
  githubfriends,
  setGithubfriends,
  ghshowfriends,
  setGHshowfriends,
}) => {
  const [searchfield, setSearchfield] = useState("");
  const [filteredusers, setFilteredusers] = useState([]);
  const [todisplayusers, setTodisplayusers] = useState([]);
  const getghfriends = async () => {
    const response = await fetch("http://localhost:8000/api/getghfriends/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("authTokens")).access,
      },
    });

    const newData = await response.json();
    setGithubfriends(newData);
    // setTodisplayusers(codeforcesUsers)
    // setFilteredusers(codeforcesUsers)
  };

  async function addfriend(e) {
    
    const response = await fetch("http://localhost:8000/api/ghfriends/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("authTokens")).access,
      },
      body: JSON.stringify({
        ghFriend_uname: e.username,
      }),
    });
    if (response.status !== 200) {
      alert("ERROR!!!!");
    }
    else
    {
      setGithubfriends((current) => [...current, e]);
    }
  }
  async function dropfriend(e) {
    
    const response = await fetch("http://localhost:8000/api/dropghfriends/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("authTokens")).access,
      },
      body: JSON.stringify({
        ghFriend_uname: e,
      }),
    });
    if (response.status !== 200) {
      alert("ERROR!!!!");
    }
    else
    {
      setGithubfriends((current) =>
      current.filter((fruit) => fruit.username !== e)
    );
    }
  }
  useEffect(() => {
    getghfriends();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (ghshowfriends) {
      setTodisplayusers(githubfriends);
    } else {
      setTodisplayusers(githubUsers);
    }
    if (searchfield === "") {
      setFilteredusers(todisplayusers);
    } else {
      // eslint-disable-next-line
      setFilteredusers(
        todisplayusers.filter((glUser) => {
          return glUser.username
            .toLowerCase()
            .includes(searchfield.toLowerCase());
        })
      );
    }
    // eslint-disable-next-line
  }, [ghshowfriends, githubfriends, searchfield, githubUsers]);
  useEffect(() => {
    if (searchfield === "") {
      setFilteredusers(todisplayusers);
    } else {
      // eslint-disable-next-line
      setFilteredusers(
        todisplayusers.filter((glUser) => {
          return glUser.username
            .toLowerCase()
            .includes(searchfield.toLowerCase());
        })
      );
    }
  }, [searchfield, todisplayusers]);
  const classes = useStyles();
  const StyledTableCell = withStyles({
    root: {
      color: !darkmode ? "Black" : "White",
    },
  })(TableCell);
  return (
    <div
      className="codechef"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "9vh",
        width: "99vw",
        flexShrink: "0",
      }}
    >
      <div style={{ visibility: "hidden", marginRight: "18vw" }}></div>{" "}
      <div>
        <TableContainer component={Paper}>
          <Table
            className={darkmode ? classes.table_dark : classes.table}
            aria-label="codeforces-table"
          >
            <TableHead>
              <TableRow
                style={{ backgroundColor: darkmode ? "#1c2e4a" : "#1CA7FC" }}
              >
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Contributions</StyledTableCell>
                <StyledTableCell>Repositories</StyledTableCell>
                <StyledTableCell>Stars</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredusers
                .sort((a, b) => (a.contributions < b.contributions ? 1 : -1))
                .map((glUser) => (
                  <TableRow key={glUser.id}>
                    <StyledTableCell>
                      <Avatar
                        src={glUser.avatar}
                        alt={`${glUser.username} avatar`}
                      />
                      {/* TODO: Lazy load the avatars ? */}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Link
                        style={{
                          fontWeight: "bold",
                          textDecoration: "none",
                          color: darkmode ? "#03DAC6" : "",
                        }}
                        href={`https://github.com/${glUser.username}`}
                        target="_blank"
                      >
                        {glUser.username}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>{glUser.contributions}</StyledTableCell>
                    <StyledTableCell>{glUser.repositories}</StyledTableCell>
                    <StyledTableCell>{glUser.stars}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        style={{backgroundColor:darkmode?"#146ca4":""}}
                        onClick={() => {
                          !githubfriends.some(
                            (item) => item.username === glUser.username
                          )
                            ? addfriend(glUser)
                            : dropfriend(glUser.username);
                        }}
                      >
                        {githubfriends.some(
                          (item) => item.username === glUser.username
                        )
                          ? "Remove Friend"
                          : "Add Friend"}
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "5vw",
          marginTop: "2vh",
          position: "relative",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search Usernames"
          variant="outlined"
          defaultValue=""
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setSearchfield(e.target.value);
          }}
        />
        <ToggleButton
          value="check"
          selected={ghshowfriends}
          onChange={() => {
            setGHshowfriends(!ghshowfriends);
          }}
          style={{
            backgroundColor:darkmode?"#02055a":"#2196f3",
            color: "white",
            marginTop: "4vh",
          }}
        >
          {ghshowfriends ? "Show All" : "Show Friends"}
        </ToggleButton>
      </div>
    </div>
  );
};
