/**
 * Created by chavaharish on 28-08-2017.
 */
var statusENUMS={
    ACTIVE:"ACTIVE",
    COMPLETE: "COMPLETE",
    DELETED: "DELETED"
};

var todos={
    1:{title: "learn JS", status:statusENUMS.ACTIVE},
    2:{title: "reading  books", status:statusENUMS.DELETED},
    3:{title: "playing cricket", status:statusENUMS.COMPLETE},
};
var nextId = 4;

module.exports = {statusENUMS: statusENUMS, todos: todos, nextId: nextId };