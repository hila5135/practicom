// // import React, { useState } from 'react';
// // import axios from 'axios';

// // // נגדיר טיפוס לאובייקטים שנשמרים במערך responses
// // type ChatMessage = {
// //   role: 'user' | 'assistant';
// //   content: string;
// // };

// // const ChatComponent = () => {
// //   const [userMessage, setUserMessage] = useState('');
// //   const [responses, setResponses] = useState<ChatMessage[]>([]); // <--- זה הפתרון
// //   const [loading, setLoading] = useState(false);

// //   const sendMessage = async () => {
// //     if (!userMessage) return;

// //     setLoading(true);
// //     try {
// //       const response = await axios.post('https://localhost:7129/api/ChatApi/chat', userMessage, {
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //     //   setResponses(prevResponses => [
// //     //     ...prevResponses,
// //     //     { role: 'user', content: userMessage },
// //     //     { role: 'assistant', content: response.data },
// //     //   ]);
// //     setResponses(prev => [
// //         ...prev,
// //         { role: 'user', content: userMessage },
// //         // { role: 'assistant', content: response.data.choices[0].message.content } // רק התוכן של התשובה
// //         { role: 'assistant', content: response.data.answer }
// //       ]);
      
// //       setUserMessage('');
// //     } catch (error) {
// //       console.error('שגיאה בשליחת השאלה:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>שאל אותי שאלה</h2>
// //       <div>
// //         {responses.map((response, index) => (
// //           <div key={index}>
// //             <strong>{response.role === 'user' ? 'אתה' : 'בוט'}:</strong> {response.content}
// //           </div>
// //         ))}
// //       </div>

// //       <input
// //         type="text"
// //         value={userMessage}
// //         onChange={(e) => setUserMessage(e.target.value)}
// //         placeholder="כתוב את השאלה שלך..."
// //       />
// //       <button onClick={sendMessage} disabled={loading}>
// //         {loading ? 'שולח...' : 'שלח שאלה'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default ChatComponent;


// import React, { useState } from 'react';
// import axios from 'axios';

// type ChatMessage = {
//   role: 'user' | 'assistant';
//   content: string;
// };

// const ChatComponent = () => {
//   const [userMessage, setUserMessage] = useState('');
//   const [responses, setResponses] = useState<ChatMessage[]>([]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!userMessage.trim()) return;

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'https://localhost:7129/api/ChatApi/chat',
//         userMessage,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setResponses((prev) => [
//         ...prev,
//         { role: 'user', content: userMessage },
//         { role: 'assistant', content: response.data.answer },
//       ]);

//       setUserMessage('');
//     } catch (error) {
//       console.error('שגיאה בשליחת השאלה:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
//       <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">שאל אותי שאלה</h2>

//       <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
//         {responses.map((response, index) => (
//           <div
//             key={index}
//             className={`p-3 rounded-lg text-sm ${
//               response.role === 'user'
//                 ? 'bg-indigo-100 text-right'
//                 : 'bg-gray-100 text-left'
//             }`}
//           >
//             <strong className="block text-xs text-gray-600 mb-1">
//               {response.role === 'user' ? 'אתה' : 'בוט'}:
//             </strong>
//             {response.content}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           placeholder="כתוב את השאלה שלך..."
//           className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//         <button
//           onClick={sendMessage}
//           disabled={loading}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
//         >
//           {loading ? 'שולח...' : 'שלח'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Stack,
} from '@mui/material';
import { FaUser, FaRobot } from 'react-icons/fa';

// טיפוס להודעות
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const ChatComponent = () => {
  const [userMessage, setUserMessage] = useState('');
  const [responses, setResponses] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setResponses((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await axios.post(
        'https://localhost:7129/api/ChatApi/chat',
        userMessage,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setResponses((prev) => [
        ...prev,
        { role: 'assistant', content: response.data.answer },
      ]);
    } catch (error) {
      console.error('שגיאה בשליחת השאלה:', error);
    } finally {
      setLoading(false);
      setUserMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <Box
      maxWidth={600}
      mx="auto"
      my={4}
      p={2}
      display="flex"
      flexDirection="column"
      gap={2}
      bgcolor="#f4f4f4"
      borderRadius={2}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        שאל אותי שאלה
      </Typography>

      <Box
        sx={{
          maxHeight: '400px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          pr: 1,
        }}
      >
        {responses.map((msg, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent={msg.role === 'user' ? 'flex-end' : 'flex-start'}
          >
            <Paper
              elevation={3}
              sx={{
                p: 1.5,
                bgcolor: msg.role === 'user' ? '#1976d2' : '#eeeeee',
                color: msg.role === 'user' ? '#fff' : '#000',
                maxWidth: '75%',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderRadius: 2,
              }}
            >
              {msg.role === 'user' ? <FaUser /> : <FaRobot />}
              <Typography>{msg.content}</Typography>
            </Paper>
          </Box>
        ))}

        {loading && (
          <Box display="flex" justifyContent="flex-start" px={1}>
            <Typography variant="body2" color="text.secondary">
              🤖 הבוט מקליד...
            </Typography>
          </Box>
        )}
      </Box>

      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="כתוב את השאלה שלך..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          disabled={loading || !userMessage.trim()}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'שלח'}
        </Button>
      </Stack>
    </Box>
  );
};

export default ChatComponent;
