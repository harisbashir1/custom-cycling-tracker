  import sax from 'sax';

  export const handleButtonClick = () => {
      console.log('Button clicked!');
    };
  
  // export function parseHealthData(XMLfile) {

  //   return new Promise((resolve, reject) => {
  //     const heartRateRecords = [];
  //     const reader = new FileReader();

  //     reader.onload = (event) => {
  //       const parser = sax.parser(true);

  //       parser.onopentag = (node) => {
  //         // Check if this is a heart rate record
  //         if (
  //           node.name === 'Record' && 
  //           node.attributes.type === 'HKQuantityTypeIdentifierHeartRate'
  //         ) {
  //           const record = {
  //             sourceName: node.attributes.sourceName,
  //             sourceVersion: node.attributes.sourceVersion,
  //             unit: node.attributes.unit,
  //             creationDate: node.attributes.creationDate,
  //             startDate: node.attributes.startDate,
  //             endDate: node.attributes.endDate,
  //             value: parseFloat(node.attributes.value)
  //           };
  //           heartRateRecords.push(record);
  //         }
  //       };
  //       parser.onerror = (error) => {
  //         reject(error);
  //       };
  //       parser.onend = () => {
  //         resolve(heartRateRecords);
  //       };

  //       // Write the entire file content to the parser
  //       parser.write(event.target.result);
  //       parser.close();
  //     };

  //     reader.onerror = (error) => {
  //       reject(error);
  //     };

  //     // Read the file as text
  //     reader.readAsText(XMLfile);
  //   });
  // };


  export function parseHealthData(XMLfile) {
    return new Promise((resolve, reject) => {
      const heartRateRecords = [];
      const reader = new FileReader();
      const chunkSize = 10000; // Number of lines or characters per chunk
      let offset = 0;
      const fileSize = XMLfile.size;
  
      const parser = sax.parser(true);
  
      // Handle opening tags to extract heart rate records
      parser.onopentag = (node) => {
        if (
          node.name === 'Record' &&
          node.attributes.type === 'HKQuantityTypeIdentifierHeartRate'
        ) {
          const record = {
            sourceName: node.attributes.sourceName,
            sourceVersion: node.attributes.sourceVersion,
            unit: node.attributes.unit,
            creationDate: node.attributes.creationDate,
            startDate: node.attributes.startDate,
            endDate: node.attributes.endDate,
            value: parseFloat(node.attributes.value)
          };
          heartRateRecords.push(record);
        }
      };
  
      // Handle parsing errors
      parser.onerror = (error) => {
        reject(error);
      };
  
      // Handle completion of parsing
      parser.onend = () => {
        resolve(heartRateRecords);
      };
  
      // Function to read the next chunk
      function readNextChunk() {
        if (offset < fileSize) {
          const chunk = XMLfile.slice(offset, offset + chunkSize);
          reader.readAsText(chunk);
        } else {
          parser.close();
        }
      }
  
      // Handle reader load event (after reading a chunk)
      reader.onload = (event) => {
        const chunkData = event.target.result;
        parser.write(chunkData); // Parse the chunk of data
        offset += chunkSize; // Move the offset forward
        readNextChunk(); // Read the next chunk
      };
  
      // Handle reader errors
      reader.onerror = (error) => {
        reject(error);
      };
  
      // Start reading the first chunk
      readNextChunk();
    });
  }



  // export function parseHealthData(XMLfile) {
  //   return new Promise((resolve, reject) => {
  //     // Configuration
  //     const chunkSize = 1000;
  //     const heartRateRecords = [];
  
  //     // Create file reader and SAX parser
  //     const reader = new FileReader();
  //     const parser = sax.parser(true);
  
  //     // Track parsing state
  //     let offset = 0;
  //     const fileSize = XMLfile.size;
  //     let parsingComplete = false;
  
  //     // Handle heart rate record extraction
  //     parser.onopentag = (node) => {
  //       try {
  //         if (
  //           node.name === 'record' && 
  //           node.attributes.type === 'HKQuantityTypeIdentifierHeartRate'
  //         ) {
  //           const record = {
  //             sourceName: node.attributes.sourcename || 'Unknown',
  //             sourceVersion: node.attributes.sourceversion || 'N/A',
  //             unit: node.attributes.unit || 'count/min',
  //             creationDate: node.attributes.creationdate,
  //             startDate: node.attributes.startdate,
  //             endDate: node.attributes.enddate,
  //             value: parseFloat(node.attributes.value)
  //           };
  
  //           // Validate record before adding
  //           if (!isNaN(record.value)) {
  //             heartRateRecords.push(record);
  //           }
  //         }
  //       } catch (extractionError) {
  //         console.warn('Error extracting record:', extractionError);
  //       }
  //     };
  
  //     // Error handling for parsing
  //     parser.onerror = (error) => {
  //       if (!parsingComplete) {
  //         console.error('SAX Parser Error:', error);
  //         reject(error);
  //       }
  //     };
  
  //     // Completion handler
  //     parser.onend = () => {
  //       if (!parsingComplete) {
  //         parsingComplete = true;
  //         resolve(heartRateRecords);
  //       }
  //     };
  
  //     // Read next chunk of the file
  //     function readNextChunk() {
  //       // Check if we've read the entire file
  //       if (offset < fileSize) {
  //         // Slice the next chunk
  //         const chunk = XMLfile.slice(offset, offset + chunkSize);
  //         reader.readAsText(chunk);
  //       } else {
  //         // Close parser when all chunks are read
  //         if (!parsingComplete) {
  //           parser.close();
  //         }
  //       }
  //     }
  
  //     // Handle each chunk after reading
  //     reader.onload = (event) => {
  //       try {
  //         const chunkData = event.target.result;
          
  //         // Parse the chunk of data
  //         parser.write(chunkData);
          
  //         // Move offset forward
  //         offset += chunkSize;
          
  //         // Read next chunk
  //         readNextChunk();
  //       } catch (chunkError) {
  //         if (!parsingComplete) {
  //           reject(chunkError);
  //         }
  //       }
  //     };
  
  //     // Handle reader errors
  //     reader.onerror = (error) => {
  //       if (!parsingComplete) {
  //         console.error('FileReader Error:', error);
  //         reject(error);
  //       }
  //     };
  
  //     // Start reading the first chunk
  //     readNextChunk();
  //   });
  // }
