import { Box, Button, Grid, Typography } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";
import { useEffect, useState } from "react";

import ProjectList from "./ProjectList";
import apiClient from "../../services/apiClient";

interface User {
    _id: string;
    name: string;
    projects: string[];
}

interface FetchUserResponse {
    user: User;
}

const Projects = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        apiClient
            .get<FetchUserResponse>("/users/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => setUser(res.data.user))
            .catch((err) => setError(err.message));
        }, []);

        const welcomeMessage = user ? (
            <Typography variant="h4" color="typography.main">
                Welcome, {user.name}!
            </Typography>
        ) : null;
        const projectsList = user ? <ProjectList projectIds={user.projects}></ProjectList> : null;

    return (
        <>
                <Grid container height="100vh" width="100%" bgcolor="bg.dark">
                    {/* project selection */}
                    <Grid 
                        container 
                        item 
                        xs={12}
                        md={8}
                        lg={9}
                        p={4}
                        order={{ xs: 2, md: 1 }}
                        height={{ xs: "60%", md: "100%" }}
                    >
                        {/* user banner */}
                        <Grid 
                            item 
                            xs={12}
                            height="25%"
                            pb={3}
                            sx={{ boxSizing: "border-box", display: { xs: "none", md: "block" } }}
                        >
                            <Box height="100%" width="100%" p={2} borderRadius="15px" bgcolor="secondary.main">
                                {welcomeMessage}
                            </Box>
                        </Grid>
                        {/* new and join project forms*/}
                        <Grid container item xs={12} height={{ xs: "55%", md: "30%" }}>
                            <Grid item xs={12} md={5} bgcolor="bg.dark">
                                <Typography variant="h4" color="typography.main">
                                    Create a new project
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={5} bgcolor="bg.dark">
                                <Typography variant="h4" color="typography.main">
                                    Join an existing project
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* user projects list */}
                        <Grid item xs={12} height="45%">
                            <Typography variant="h4" color="typography.main">
                                Your projects list
                            </Typography>
                            {projectsList}
                        </Grid>
                    </Grid>
                    {/* selected project */}
                    <Grid 
                        item 
                        xs={12}
                        md={4}
                        lg={3}
                        order={{ xs: 1, md: 2 }}
                        p={4}
                        height={{ xs: "40%", md: "100%" }}
                        bgcolor="bg.main"
                    >
                        <Typography variant="h4" color="typography.main">
                            Current selection
                        </Typography>
                        <Box my={3} display="flex" justifyContent="center">
                            {/* <ProjectBox></ProjectBox> */}
                        </Box>
                        <Box display={{ xs: "none", md: "block" }}>
                            <Typography variant="h4" color="typography.main">
                                Project description
                            </Typography>
                            <Typography variant="body1" color="typography.main">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, dolor?
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, culpa.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quia?
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, iure.
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent={{ xs: "center", md: "left" }} mt={3}>
                            <Button variant="contained" color="secondary" size="large" endIcon={<PlayIcon />}>
                                Play Project
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </>
    );
};

export default Projects;