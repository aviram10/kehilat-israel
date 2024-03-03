
import Table2 from "../muiComps/table2";
//id, user id, title, content, date, likes, category, username, role
const heads = [
    {
        id: 'post_id',
        numeric: false,
        disablePadding: false,
        label: 'מזהה פוסט'
    },
    {
        id: 'user_id',
        numeric: false,
        disablePadding: false,
        label: 'מזהה משתמש'
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'כותרת'
    },
    {
        id: 'content',
        numeric: false,
        disablePadding: false,
        label: 'תוכן'
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'תאריך'
    },
    {
        id: 'likes',
        numeric: false,
        disablePadding: false,
        label: 'לייקים'
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'קטגוריה'
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'שם משתמש'
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'תפקיד'
    }
]


export default function PostsHandler({ posts, setPosts, tableProps }) {
    return <>
        <Table2 {...{ tableProps, heads, data: posts, selected_id: "post_id" }}>
        </Table2>
    </>
}