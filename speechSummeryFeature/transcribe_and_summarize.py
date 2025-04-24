import whisper

# טוענים את המודל של Whisper
model = whisper.load_model("base")

# תמלול של קובץ אודיו (שימי את הקובץ שלך בתיקיה)
result = model.transcribe("lesson.mp3")  # החליפי לנתיב הקובץ שלך
print(result["text"])  # תציג את התמלול
