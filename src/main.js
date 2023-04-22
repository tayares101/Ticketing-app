document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(event) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issuePriority = document.getElementById('issuePriorityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        priority: issuePriority,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };

    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    event.preventDefault();
}

function setUpdatedStatus(id, newStatus) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = newStatus;
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
            break;
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var priority = issues[i].priority;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        var issuesContent =          '<div class="well">' + 
                                    '<h6>Issue ID: ' + id + '</h6>' +
                                    '<p><span class="label label-info">' + status + '</span></p>' +
                                    '<h3>' + desc + '</h3>' +
                                    '<p><span class="glyphicon glyphicon-time"></span>' + priority + '</p>' +
                                    '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>';

        if (status == 'Open') {
            issuesContent += '<a href="#" onclick="setUpdatedStatus(\''+id+'\', \''+'Closed'+'\')" class="btn btn-warning">Close</a>';
        } else if (status === 'Closed') {
            issuesContent += '<a href="#" onclick="setUpdatedStatus(\''+id+'\', \''+'Open'+'\')" class="btn btn-success">Open</a>';
        }

        issuesContent += '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger p-2">Delete</a></div>';
        issuesList.innerHTML += issuesContent;
    }
}