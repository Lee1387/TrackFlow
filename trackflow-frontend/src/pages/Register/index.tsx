import { Grid, Box, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import RegisterForm from './RegisterForm';

const Register = () => {
    return (
        <>
            <Grid container height="100vh">
                <Grid item xs={12} md={6} sx={{ height: { xs: '70%', md: '100%' } }}>
                    <Box
                        bgcolor="bg.main"
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Stack direction="column" spacing={1} mb={8} width="60%">
                            <Typography variant="h4" color="typography.main">
                                Create Your TrackFlow Account!
                            </Typography>
                            <Typography variant="body1" color="typography.light">
                                {"Already have one? "}
                                <Typography
                                component={Link}
                                to="/login"
                                sx={{
                                    textDecoration: "none",
                                    color: "primary.main",
                                    "&:visited": {
                                        color: "primary.main",
                                    },
                                }}
                                >
                                    Log in
                                </Typography>
                            </Typography>
                        </Stack>
                        <RegisterForm />
                    </Box>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                p={4}
                bgcolor="bg.main"
                pb={{ xs: 0, md: 4 }}
                height={{ xs: "30%", md: "100%" }}
            >
                <Box
                    sx={{
                        bgcolor: 'primary.main',
							height: '100%',
							borderRadius: { xs: '15px 15px 0 0', md: '15px' },
					}}
                ></Box>
            </Grid>
        </Grid>
    </>
    );
};

export default Register;