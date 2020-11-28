
export const CONTAINER_DETAILS = [{ gridId: 'projects', idColumns: ['id', 'checked'] }, { gridId: 'comments', idColumns: ['id', 'taskId', 'checked'] }, { gridId: 'components', idColumns: ['id', 'checked', 'projectId'] }];
export const PROJECTS_NAME = 'projects';

export const COMMENT_NAME = 'comments';

export const COMPONENT_NAME = 'components';
export const COMPONENT_DATA = [];

export const SPRINT_NAME = 'sprints';
export const SPRINT_DATA = [];

export const COMMENT_DATA = [];
export const TASK_SECTION = [{
    type: 'kanban', options: [
        { id: 'backlog', header: 'Backlog' },
        { id: 'development', header: 'Selected for development' },
        { id: 'progress', header: 'In progress' },
        { id: 'done', header: 'Done' }
    ]
}, {
    type: 'scrum', options: [
        {
            id: "todo",
            header: "to do"

        },
        {
            id: "doing",
            header: "in progress"
        },
        {
            id: "done",
            header: "done"
        }
    ]
}];


export const TEMPLATE_MAIN_OPTIONS = [{
    id: 'business',
    text: 'Business',
    icon: 'icon',
    list: []
}, {
    id: 'software',
    text: 'Software',

    list: [{
        id: 'kanban',
        header: 'Kanban',
        iconSrc: 'kanban.svg',
        description: 'Monitor work in a continuous flow for agile teams. Suits teams who control work volume from a backlog'
    }, {
        id: 'scrum',
        header: 'Scrum',
        iconSrc: 'scrum.svg',
        description: 'Manage stories, tasks, and workflows for a scrum team. For teams that deliver work on a regular schedule'
    }, {
        id: 'bug',
        header: 'Bug tracking',
        iconSrc: 'bug.svg',
        description: "Manage a list of development tasks and bugs. Great for teams who don't need a board"
    }]
}]
export const PROJECT_DATA = [
];

/**this isthe secton for the tasks */
export const TASK_NAME = 'tasks';
export const TASK_DATA = [];
export const ACTIVE_MODAL_PROP = 'showModal';

/**issue types list */
export const ISSUE_TYPES = [{ id: 'task', text: 'Task', class: 'fa-tasks important-text' }, { id: 'story', text: 'Story', class: 'fa-archive success-text ' }, { id: 'bug', text: 'Bug', class: 'fa-bug danger-text' }, { id: 'epic', text: 'Epic', class: 'fa-picture-o epic-text' }];


/**list of the font name  */
export const FONT_NAME_LIST = ["Arial",
    "Helvetica",
    "Times New Roman",
    "Sans serif",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Comic Sans MS",
    "Arial Black",
    "Tahoma",
    "Comic Sans MS"]

/**list of the priority */
export const PRIORIPTY_LIST =
    [{ id: 'lowest', text: 'Lowest', class: 'fa-long-arrow-down danger-text text-bold' },
    { id: 'low', text: 'Low', class: 'fa-long-arrow-down danger-text text-bold' },
    { id: 'medium', text: 'Medium', class: 'fa-long-arrow-up attention-text text-bold' },
    { id: 'high', text: 'High', class: 'fa-long-arrow-up success-text text-bold' },
    { id: 'highest', text: 'Highest', class: 'fa-long-arrow-up success-text text-bold' }]

/**list of the tab for edting the issue */
export const ISSUE_TAB_LIST = [
    { id: 'edit', text: 'Edit' },
    { id: 'comment', text: 'Comment' },
    { id: 'history', text: 'History' }
]

/**list of the item that we want to show in the drop down toggle of sprint */
export const EDIT_SPRINT_METHOD_NAME = 'editSprint';
export const DELETE_SPRINT_METHOD_NAME = 'deleteSprint';
export const MOVE_SPRINT_UP = 'moveSprintUp';
export const MOVE_SPRINT_DOWN = 'moveSprintDown';
export const SPRINT_DROP_DOWN_LIST =
    [{ displayname: 'Edit sprint', methodName: EDIT_SPRINT_METHOD_NAME },
    { displayname: 'Delete sprint', methodName: DELETE_SPRINT_METHOD_NAME },
    { displayname: 'Move sprint up', methodName: MOVE_SPRINT_UP, flag: 'up' },
    { displayname: 'Move sprint down', methodName: MOVE_SPRINT_DOWN, flag: 'down' },]

/**list of the items in the toggle drop down for the ticket */
export const CLONE_TICKET = 'cloneTicket';
export const DELETE_TICKET = 'deleteTicket';
export const ADD_FLAG = 'addFlag';
export const REMOVE_FLAG = 'removeFlag';
export const LOG_WORK = 'logWork';
export const CREATE_SUB_TASK = 'create_sub_task';

export const TICKET_DROP_DOWN =
    [{ displayname: 'Clone', methodName: CLONE_TICKET },
    { displayname: 'Delete', methodName: DELETE_TICKET },
    { displayname: 'Add flag', methodName: ADD_FLAG, flag: 'add' },
    { displayname: 'Remove flag', methodName: REMOVE_FLAG, flag: 'remove' },
    { displayname: 'Log work', methodName: LOG_WORK },
    { displayname: 'Create Sub-task', methodName: CREATE_SUB_TASK }]
export const LIST_OF_UNIT_FOR_LOG = {
    w: 5 * 24 * 60,
    d: 24 * 60,
    h: 60,
    m: 1
};
export const TIME_TRACKING_REGEX = /^(\d{1,10}[w])??(\d{1,10}[d])??(\d{1,10}[h])??(\d{1,10}[m])??$/;