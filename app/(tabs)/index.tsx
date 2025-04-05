import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { fetchProducts } from "../../services/api";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        
        setDisplayedProducts(data.slice(0, ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = searchQuery 
    ? products.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : displayedProducts;

  const loadMoreProducts = () => {
    if (searchQuery) return;
    
    if (loadingMore || displayedProducts.length >= products.length) return;

    setLoadingMore(true);
    
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newProducts = products.slice(0, endIndex);
    
    setTimeout(() => {
      setDisplayedProducts(newProducts);
      setPage(nextPage);
      setLoadingMore(false);
    }, 1000);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    
    return (
      <View className="py-4 justify-center items-center">
        <ActivityIndicator size="large" color="#f4b001" />
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f4b001" />
        <Text className="text-lg text-gray-500 mt-4">Loading products...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="px-4 pt-2 pb-3">
        <SearchBar 
          placeholder="Search products..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        className="pt-2"
        initialNumToRender={6}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Index;