const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5001;

const adminRoute = require("./admin/admin");
const authRoute = require("./routes/auth");
const questionRoute = require("./routes/question");
const userRoute = require("./routes/user");
const answerRoute = require("./routes/answer");
const commentRoute = require("./routes/comment");
const searchRoute = require("./routes/search");
const mypageRoute = require("./routes/mypage");
const setupScheduledJob = require("./utils/setupScheduledJob");

dotenv.config();
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Preflight 요청 처리
app.options("*", cors());

// CORS 설정 미들웨어 위치 변경
app.use(
  cors({
    origin: ["https://dingdong-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  })
);

// 라우트 핸들러에 CORS 허용을 설정합니다.
app.use(
  "/admin",
  cors({
    origin: ["https://dingdong-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  }),
  adminRoute
);
app.use(
  "/api/auth",
  cors({
    origin: ["https://dingdong-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  }),
  authRoute
);
app.use(
  "/api/articles",
  cors({
    origin: ["https://dingdong-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  }),
  questionRoute
);
app.use(
  "/api/users",
  cors({
    origin: ["https://dingdong-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  }),
  userRoute
);
app.use(
  "/api/answer",
  cors({
    origin: ["https://dingdong-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  }),
  answerRoute
);
app.use(
  "/api/comment",
  cors({
    origin: ["https://dingdong-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  }),
  commentRoute
);
app.use(
  "/api/search",
  cors({
    origin: ["https://dingdong-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  }),
  searchRoute
);
app.use(
  "/api/mypage",
  cors({
    origin: ["https://dingdong-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  }),
  mypageRoute
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  setupScheduledJob();
});
