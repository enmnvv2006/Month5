import { useState } from "react";
import { Card, Row, Col, Select, Spin, Empty, Tag, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../api/products.api";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await productsApi.getCategories();
      return response.data;
    },
  });

  // Fetch products (with dependency on selectedCategory)
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const response = await productsApi.getProducts(selectedCategory);
      return response.data;
    },
  });

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleCategoryReset = () => {
    setSelectedCategory(null);
  };

  const loading = categoriesLoading || productsLoading;
  const error = productsError;

  return (
    <div style={{ padding: "40px 20px" }}>
      <Card title="Products" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ marginRight: 10, fontWeight: "bold" }}>
            Filter by category:
          </label>
          <Select
            style={{ width: 300 }}
            placeholder="Select a category"
            allowClear
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={[
              { label: "All Categories", value: null },
              ...categories.map((cat) => ({
                label: cat.name || cat.title || cat.id,
                value: cat.id,
              })),
            ]}
          />
          {selectedCategory && (
            <Button onClick={handleCategoryReset} style={{ marginLeft: 10 }}>
              Reset Filter
            </Button>
          )}
        </div>
      </Card>

      {loading && (
        <div style={{ textAlign: "center", padding: 50 }}>
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Card style={{ marginBottom: 24 }}>
          <div style={{ color: "red" }}>Error: {String(error.message)}</div>
        </Card>
      )}

      {!loading && products.length === 0 && (
        <Empty description="No products found" />
      )}

      {!loading && products.length > 0 && (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  product.image ? (
                    <img
                      alt={product.name || product.title}
                      src={product.image}
                      style={{ height: 200, objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 200,
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      No Image
                    </div>
                  )
                }
              >
                <Card.Meta
                  title={product.name || product.title}
                  description={
                    <div>
                      <p
                        style={{ margin: "8px 0", fontSize: 12, color: "#666" }}
                      >
                        {product.description?.substring(0, 100)}
                        {product.description?.length > 100 ? "..." : ""}
                      </p>
                      {product.price && (
                        <div style={{ marginTop: 8 }}>
                          <span
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              color: "#1890ff",
                            }}
                          >
                            ${product.price}
                          </span>
                        </div>
                      )}
                      {product.category && (
                        <Tag color="blue" style={{ marginTop: 8 }}>
                          {product.category.name || product.category}
                        </Tag>
                      )}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductsPage;
