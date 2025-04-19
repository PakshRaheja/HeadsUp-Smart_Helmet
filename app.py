from flask import Flask, render_template, Response, jsonify
import cv2

app = Flask(__name__)
camera = cv2.VideoCapture(0)

fall_detected = False  

def detect_fall_from_angle(frame):
    global fall_detected
    try:
        height, width = frame.shape[:2]
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150, apertureSize=3)
        lines = cv2.HoughLines(edges, 1, 3.14 / 180, 150)

        if lines is not None:
            for rho, theta in lines[:, 0]:
                angle = theta * (180 / 3.14)
                if 80 < angle < 100:
                    fall_detected = False
                    return "NORMAL"
                elif angle <= 45 or angle >= 135:
                    fall_detected = True
                    return "FALL DETECTED"

        fall_detected = False
        return "NORMAL"

    except Exception as e:
        print("Error in fall detection:", e)
        fall_detected = False
        return "NORMAL"

def gen_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            status = detect_fall_from_angle(frame)
            color = (0, 0, 255) if fall_detected else (0, 255, 0)
            cv2.putText(frame, status, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
            _, buffer = cv2.imencode('.jpg', frame)
            frame_data = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_data + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/fall_status')
def fall_status():
    return jsonify({'fall': fall_detected})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, ssl_context='adhoc')

