## Project initialization

The app uses React 18 with context and routing set up at the entry point (`main.jsx`):

- `AuthContextProvider` handles user authentication state and logic.
- `PostContextProvider` manages all operations related to posts, likes, and comments.
- `BrowserRouter` enables routing between different pages without refreshing the browser.


### File: `main.jsx`

```js
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)




## 🚦 App Routing & Authentication Logic

The `App.jsx` file defines the routing logic of the app and uses the `token` from `AuthContext` to determine whether a user is authenticated.

### 🔐 If the user **is logged in**:
| Route          | Component   | Description                      |
|----------------|-------------|----------------------------------|
| `/`            | Redirect    | Redirects to `/posts`            |
| `/posts`       | `PostPage`  | Main feed of posts               |
| `/create-post` | `AddPost`   | Form to create a new post        |

### 🧑‍🚫 If the user **is not logged in**:
| Route         | Component      | Description                     |
|---------------|----------------|---------------------------------|
| `/` or `/login` | `LandingPage` | Login or landing page           |
| `/register`     | `RegisterPage`| User registration form          |

### ⚠️ Notes
- `ToastContainer` from `react-toastify` is used globally to display toast messages.
- `Navigate` helps redirect users based on authentication state.







## 🔐 AuthContext — Global Authentication State

The `AuthContext` provides and manages the authentication logic across the application using React Context API.

### 🌐 Context Values Provided

| Key                  | Type      | Description                                 |
|----------------------|-----------|---------------------------------------------|
| `token`              | Boolean   | Logged-in state (based on cookie)           |
| `user`               | Object    | Current logged-in user details              |
| `handleRegister()`   | Function  | Register a new user                         |
| `handleLogin()`      | Function  | Login an existing user                      |
| `handleLogout()`     | Function  | Logout the current user                     |
| `fetchCurrentUserDetails()` | Function | Fetch user info using `/me` endpoint   |
| `backendUrl`         | String    | Base URL of the backend API                 |

### ⚙️ Internal Features

- Uses `axios` for HTTP requests.
- Auth token stored in cookies using `js-cookie`.
- Automatically sets the `Authorization` header for authenticated requests.
- Uses `react-toastify` for toast notifications.
- Redirects user on login/logout using `useNavigate()`.

### 🚩 TODO / Notes

- Fix: `useState(!cookie.get('token'))` is likely incorrect. Should be:
  ```js
  const [token, setToken] = useState(!!cookie.get('token'))




  ## 📮 PostContext — Global Context for Post Operations

This context handles all post-related logic and global state for the app using the Context API.

### 🌐 Values Provided

| Key                     | Type       | Description                                      |
|--------------------------|------------|--------------------------------------------------|
| `fetchAllPosts()`        | Function   | Fetches all public posts                        |
| `fetchPostsOfLoginUser()` | Function   | Fetches posts created by the current user       |
| `likePosts(postId)`      | Function   | Likes a post by its ID                          |
| `postsComment(id, text)` | Function   | Adds a comment to a post                        |
| `createPost(text, image)`| Function   | Creates a new post with optional image          |
| `deletePost(id)`         | Function   | Deletes a post by its ID                        |
| `allPosts`               | Array      | Stores all public posts                         |
| `userPosts`              | Array      | Stores only posts by the logged-in user         |
| `setUserPosts()`         | Function   | Directly set user posts if needed               |

### ⚠️ Known Issues

- `likePosts()` function incorrectly uses `id` instead of `postId` → fix this:
  ```js
  const {data} = await axios.put(`${backendUrl}/api/posts/post/${postId}/like`, {}, ...)








  ## 🚪 LandingPage — User Login & Branding

This is the landing/login page for the app. It uses branding visuals and allows users to log in via email/password.

### ✨ Features
- Responsive layout using Flexbox and TailwindCSS
- Branded visual section (with TiltCard hover animation)
- Login form with validation and AuthContext integration
- Social media login icons (placeholders for future integration)
- Links to register or reset password
- Buttons for downloading the app from Google Play or Microsoft Store

### 🧠 Context Used
- `AuthContext` for `handleLogin` function
- On successful login, `handleLogin` should manage token storage and redirection

### 🖼 Assets Required
- `/assets/affina-landing-img.jpg` - Main landing visual
- `/assets/logo-img.jpg` - App logo
- `/assets/Google_Play-Logo.wine.svg` - Google Play badge
- `/assets/microsoft-logo.svg` - Microsoft Store badge

### 📦 Dependencies
- `react-router-dom` → `useNavigate`
- `react-icons` → `FaFacebook`, `FaGoogle`, `FaApple`
- `TiltCard` → a custom 3D hover effect component

---

### ⚠️ Suggested Fixes
- Spelling fix: `"Phone numner"` → `"Phone number"`
- Add `required` attributes to inputs to prevent empty form submission
- (Optional) Add feedback if login fails using a toast/alert







## 🚪 LandingPage — User Login & Branding

This is the landing/login page for the app. It uses branding visuals and allows users to log in via email/password.

### ✨ Features
- Responsive layout using Flexbox and TailwindCSS
- Branded visual section (with TiltCard hover animation)
- Login form with validation and AuthContext integration
- Social media login icons (placeholders for future integration)
- Links to register or reset password
- Buttons for downloading the app from Google Play or Microsoft Store

### 🧠 Context Used
- `AuthContext` for `handleLogin` function  
- On successful login, `handleLogin` should manage token storage and redirection

### 🖼 Assets Required
- `/assets/affina-landing-img.jpg` – Main landing visual
- `/assets/logo-img.jpg` – App logo
- `/assets/Google_Play-Logo.wine.svg` – Google Play badge
- `/assets/microsoft-logo.svg` – Microsoft Store badge

### 📦 Dependencies
- `react-router-dom` → `useNavigate`
- `react-icons` → `FaFacebook`, `FaGoogle`, `FaApple`
- `TiltCard` → a custom 3D hover effect component

---

### ⚠️ Suggested Fixes
- Spelling fix: `"Phone numner"` → `"Phone number"`
- Add `required` attributes to inputs to prevent empty form submission
- (Optional) Add feedback if login fails using a toast/alert









## 📝 PostPage — All Posts Feed, Like, and Comment

The `PostPage` is the main feed page that displays all posts from users. It allows viewing, liking, and commenting on posts and also displays a user profile and sidebar navigation.

### ✨ Features
- Displays a list of posts fetched from the backend
- Supports liking posts with instant UI feedback
- Users can add comments to posts (up to 3 shown by default)
- Responsive layout with a sidebar, navbar, and profile section
- Dynamic data rendering using `useContext` for `AuthContext` and `PostContext`
- Basic comment input with avatar and icon buttons

### 🧠 Contexts Used
- `AuthContext` → provides logged-in `user`
- `PostContext` → provides:
  - `allPosts`
  - `likePosts(postId)`
  - `postsComment(postId, comment)`
  - `fetchAllPosts()`

### 📦 Dependencies
- `react-icons` → `FaRegThumbsUp`, `FaCommentDots`, `IoIosAttach`, `IoSend`
- `SideBar`, `Navbar`, `Profile` → reusable components
- TailwindCSS → used for styling and responsiveness

### 🖼 Assets Used
- User avatars and post images are dynamically pulled from backend
- Icons from `react-icons`

---

### ⚠️ Suggested Fixes / Improvements
- **Comment Count Bug:** `post.likes.length` is used in both Likes and Comments — should use `post.comment.length` for comment count
- **Post Comment Button Logic:** Currently, the "Send" button is not connected to form submission — either remove `type="button"` or use it to trigger `handleSubmit`
- **Improve Accessibility:** Add `alt` text to user avatars and post images
- **Add Loading State:** Use a loader/spinner while `fetchAllPosts()` is running







## 👤 Profile — User Sidebar & Uploaded Posts

This is the user profile sidebar that displays the logged-in user's avatar, name, email, total post count, and uploaded photos. Each uploaded photo has a delete option visible on hover.

### ✨ Features
- Responsive sidebar (only visible on medium+ screens)
- Shows user avatar, username, and email
- Displays total number of uploaded posts
- Grid layout of user-uploaded images
- Hover-to-delete functionality for each post image
- Uses smooth transition effects on hover

### 🧠 Context Used
- `AuthContext` to access the current `user`
- `PostContext` to:
  - Fetch user’s own posts via `fetchPostsOfLoginUser`
  - Delete a post via `deletePost`
  - Manage user posts via `userPosts`, `setUserPosts`

### ⚙️ Behavior
- Fetches user's posts once on component mount (`useEffect`)
- Clears previous user post state when mounting
- Clicking the delete icon removes the selected image from the user's post list

### 📦 Dependencies
- `react-icons` → `MdDelete` from `react-icons/md`

### ⚠️ Suggested Fixes
- Fix typo: `"item-center"` → `"items-center"` for proper alignment
- Add confirmation before deleting posts
- Improve responsiveness on small screens (currently hidden on mobile)









## 🧭 Navbar — Responsive Header with Post & Logout Buttons

The `Navbar` component provides a responsive navigation bar that includes branding (logo), a button to add a new post, and a logout button. On smaller screens, it collapses into a hamburger menu.

### ✨ Features
- Responsive layout: switches to hamburger menu on small screens
- Logo with home redirection
- "Add new post" button visible on both desktop and mobile
- Logout functionality
- Smooth transition between open/close states of mobile menu

### 🧠 Context Used
- `AuthContext` for:
  - `handleLogout` function to log the user out
- `react-router-dom` for:
  - `useNavigate` to redirect to pages (`/`, `/create-post`)

### 📦 Dependencies
- `react-router-dom` → `useNavigate`
- `react-icons` → 
  - `IoMdMenu`, `IoMdClose`, `IoIosLogOut` for mobile menu and logout
  - `IoAddCircleOutline` for add post icon

### ⚙️ Behavior
- On clicking the logo, users are redirected to the homepage
- "Add new post" redirects to `/create-post`
- Logout button clears auth context and redirects to `/`

### ⚠️ Suggested Fixes
- Fix typo: `"item-center"` → `"items-center"` for correct alignment
- Consider closing mobile menu after navigation for improved UX
- Add `aria-label` for buttons for accessibility







## 📚 SideBar — Vertical Navigation with User Info & Logout

The `SideBar` component provides a fixed-height vertical navigation bar for desktop views. It includes basic navigation links, help & support access, and logout functionality.

### ✨ Features
- Vertical sidebar UI with icons and labels
- User avatar and logout button at the bottom
- Navigational sections: Home, Profile, Settings
- Static Help & Support entry
- Responsive styling with Tailwind classes

### 🧠 Context Used
- `AuthContext`
  - `user`: current logged-in user info (e.g., avatar)
  - `handleLogout`: clears auth state and logs user out

### 📦 Dependencies
- `react-router-dom` → `useNavigate`
- `react-icons` → Icon components:
  - `RiHome2Line`, `CgProfile`, `CiSettings`, `MdOutlineHelpOutline`

### 🛠️ Behavior
- The `Logout` button:
  - calls `handleLogout()` from context
  - redirects user to `/` after logout
- The `user.avatar` is shown inside the logout button
- All entries are static and non-clickable except Logout
  - You can enhance them with `onClick={() => navigate("/route")}`

### 📌 Notes
- Tailwind classes ensure clean spacing, borders, and hover behavior
- Consider making nav items navigable with route handlers
- Use `aria-label`s for accessibility improvements








## 🔄 TiltCard — 3D Hover Tilt Component

The `TiltCard` component adds a smooth 3D tilt and scale effect to any wrapped content when hovered, using raw mouse movement and DOM transformation.

### 🚀 Features
- 3D tilt based on mouse position relative to the card
- Configurable tilt angle (`maxTilt`) and scale factor (`scaleFactor`)
- Smooth transition back to original state on mouse leave

### ✨ Props

| Prop         | Type    | Default | Description                                           |
|--------------|---------|---------|-------------------------------------------------------|
| `children`   | React   | —       | Content to be displayed inside the tilting container |
| `maxTilt`    | Number  | `24`    | Maximum degrees to tilt in X/Y direction             |
| `scaleFactor`| Number  | `1.05`  | How much to scale the card on hover                  |

### 🧠 Internals
- Uses `useRef` to directly manipulate DOM element styles
- Mouse movement is captured to calculate rotation angles
- Applies `transform` styles with `perspective`, `scale`, `rotateX`, `rotateY`

### 🧱 Styling
- Tailwind class: `transition-transform duration-300 ease-out rounded-xl`
- You can wrap any card, image, or component inside `TiltCard`

### 🛠️ Example Usage

```jsx
<TiltCard maxTilt={30} scaleFactor={1.1}>
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-bold">Cool Hover Effect</h3>
    <p>Move your mouse over this card!</p>
  </div>
</TiltCard>










## 📝 AddPost.jsx — Create Post UI Component

The `AddPost` component provides a user interface to create a new post with a caption and image upload.

### ✅ Features
- Live image preview before upload
- Textarea for captions
- Image file validation (basic)
- Uses global `PostContext` to create the post
- Responsive and styled with Tailwind CSS

### 🧩 Props
This component does not accept props directly. It consumes context from:

- `PostContext` → `createPost(text, image)`

### 🧠 Internal Logic
- `text` holds the caption input
- `image` stores the raw image file
- `imagePreview` is a base64 version shown as preview
- `FileReader` is used to convert and preview the uploaded image
- On form submission, the post is submitted via `createPost`

### 🖼️ UI Layout
- Tailwind styled container with gradient background
- Input:
  - Caption textarea
  - Image input field
- Preview:
  - Image preview if a file is selected
- Action:
  - Submit button

### 📦 Dependencies
- React Context (`PostContext`)
- Tailwind CSS

### 💡 Example Integration

```jsx
import AddPost from "./components/AddPost";

function CreatePostPage() {
  return (
    <div>
      <AddPost />
    </div>
  );
}