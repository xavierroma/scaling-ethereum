import { Box, Button, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Index() {
  return (
    <Box>
      <ConnectButton />
      <Typography>I'm Alive</Typography>
      <Button>Click Me</Button>
    </Box>
  );
}
