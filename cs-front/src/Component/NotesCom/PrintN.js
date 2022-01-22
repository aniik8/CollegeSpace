import React, { useRef } from 'react'
import { ReactToPrint } from 'react-to-print';
import {ViewSNote} from './ViewSNote'

const PrintN = () => {
    const componentRef = useRef(null);
    
    return (
        
        <div>
        <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <ViewSNote ref={componentRef} />
      
    </div>
    
    )
}

export default PrintN
