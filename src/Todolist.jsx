import React, { useState } from "react";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
function Todolist() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("low");
  const [searchQuery, setSearchQuery] = useState("");

  const addTodo = () => {
    if (title.trim() && description.trim()) {
      const newTodo = {
        title: title.trim(),
        description: description.trim(),
        status,
        active: true,
      };
      setTodos([...todos, newTodo]);
      setTitle("");
      setDescription("");
      setStatus("low");
    }

    console.log(title);
    console.log(todos);
    console.log(description);
    console.log(status);
  };
  const deleteTodos = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleActive = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].active = !updatedTodos[index].active;
    setTodos(updatedTodos);
  };

  const filterTodo = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <Container className="mt-4">
        <h3 className="text-uppercase font-bold text-2xl mb-4">
          Dynamic to-do app
        </h3>
        <Col md={4}>
          <div className="position-relative mb-3">
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                color: "#aaa",
                pointerEvents: "none",
                transform: "translateY(-50%)",
              }}
            />
            <Form.Control
              type="search"
              placeholder="Search Todos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-3"
              style={{ paddingLeft: "35px" }} // To add space for the icon
            />
          </div>
        </Col>
        {/* todo form */}
        <Form>
          <Row className="mb-2">
            <Col md={3} className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
            </Col>
            <Col md={3} className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
              />
            </Col>
            <Col md={3} className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Form.Select>
            </Col>
            {/* add to do button */}
            <Col md={3} className="d-flex justify-content-center align-items-center">
  <Button variant="primary" className="w-50 h-50" onClick={addTodo}>
    Add Todo
  </Button>
</Col>
          </Row>
        </Form>
        <ul className="list-group mt-3">
        {filterTodo.map((todo, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ opacity: todo.active ? 1 : 0.5 }}
            >
              <h5 className="mb-1">{todo.title}</h5>
              <small className="text-muted">{todo.description}</small>

              <Badge
                className="d-flex items-center justify-center"
                bg={
                  todo.status === "High"
                    ? "danger"
                    : todo.status === "Medium"
                    ? "warning"
                    : "success"
                }
              >
                {todo.status}
              </Badge>

              <div className="d-flex gap-2">
                <Button
                  variant={todo.active ? "success" : "secondary"}
                  size="sm"
                  onClick={() => toggleActive(index)}
                >
                  {todo.active ? (
                    <>
                      <FaToggleOn size={20} />
                    </>
                  ) : (
                    <>
                      <FaToggleOff size={20} />
                    </>
                  )}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTodos(index)}
                >
                  Delete
                </Button>
              </div>
            </li>
  ))}
        </ul>
      </Container>
    </div>
  );
}

export default Todolist;
