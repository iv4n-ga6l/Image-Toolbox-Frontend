import { Typography, Link, Grid, styled, AppBar, Toolbar } from '@mui/material';
import { GitHub } from '@mui/icons-material';

const FooterWrapper = styled(AppBar)(
    ({ theme }) => `
          position: fixed;
          top: auto;
          bottom: 0;
          height: 15%;
          background: linear-gradient(to left, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark});
          color: white;
  `
);


const Footer = () => {
    return (
        <FooterWrapper >
            <Toolbar>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                        <Typography variant="body1">&copy; {new Date().getFullYear()} Image Toolbox. All rights reserved.</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Made with MUI React 💙</Typography>
                    </Grid>
                    <Grid item>
                        <Link href="/" color="inherit">Privacy Policy</Link>
                    </Grid>
                    <Grid item>
                        <Link href="/" color="inherit">Terms of Service</Link>
                    </Grid>
                    <Grid item>
                        <Link href="https://github.com/IvanGael" color="inherit"><GitHub /></Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </FooterWrapper>
    );
};

export default Footer;
