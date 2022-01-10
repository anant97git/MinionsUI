import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({ title, subject, story, key_source,msid }) {
  
  return (
    <Card sx={{ maxWidth: 550 }}>
      <CardActionArea>
        {console.log("MSId" ,msid)}
        <CardMedia
          component="img"
          height="140"
          image={"http://172.29.38.107:8082/minions/image/getImage?msid="+msid}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subject}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}