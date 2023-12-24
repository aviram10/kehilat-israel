import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';

export default function BasicAutocomplete() {
  return (
    <Autocomplete 
    
      placeholder="נושא"
        options={["ספורט", "פוליטיקה", "טכנולוגיה", "כללי"]}
      
      sx={{ width: 300 }}
    />
  );
}