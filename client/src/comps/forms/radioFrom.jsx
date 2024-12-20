import * as React from 'react';

import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { Card, Typography } from '@mui/joy';



export default function IconlessRadio({ values, handleChange }) {
  return (
    <Card variant='soft' color={"primary"} sx={{ width:"50%", direction: "ltr", textAlign: "center" }} >
      <Typography level='title-md' >
        בחרו סוג הקדשה
      </Typography>
      <RadioGroup
        onChange={e => handleChange(e)}
        aria-labelledby="choose-label"
        defaultValue="dedicate"
        size="lg"
        sx={{ gap: 1.5 }}
      >
        {values.map((value) => (
          <Sheet
            color='primary'
            variant='outlined'
            key={value}
            sx={{
              p: 2,
              borderRadius: 'md',
              boxShadow: 'sm',
            }}
          >
            <Radio
              label={value}
              overlay
              disableIcon
              value={value}
              slotProps={{
                label: ({ checked }) => ({
                  sx: {
                    fontWeight: 'lg',
                    fontSize: 'md',
                    color: checked ? 'text.primary' : 'text.secondary',
                  },
                }),
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      bgcolor: "lightblue",
                      '--variant-borderWidth': '2px',
                      '&&': {
                        // && to increase the specificity to win the base :hover styles
                        borderColor: theme.vars.palette.primary[500],
                      },
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
        ))}
      </RadioGroup>
    </Card>
  );
}