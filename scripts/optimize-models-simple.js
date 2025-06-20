const fs = require('fs');
const path = require('path');
const { NodeIO } = require('@gltf-transform/core');
const { ALL_EXTENSIONS } = require('@gltf-transform/extensions');
const { 
  dedup, 
  weld,
  quantize,
  prune
} = require('@gltf-transform/functions');

async function optimizeModel(inputPath, outputPath) {
  console.log(`\n🔄 Optimizing: ${inputPath}`);
  
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
  
  try {
    // Load the GLB file
    const document = await io.read(inputPath);
    
    // Get original file size
    const originalSize = fs.statSync(inputPath).size;
    console.log(`📏 Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Apply optimizations (without Draco for now)
    await document.transform(
      // Remove duplicate vertices and materials
      dedup(),
      
      // Weld vertices that are close together
      weld(),
      
      // Quantize vertex attributes to reduce precision
      quantize({
        quantizePosition: 14,
        quantizeNormal: 10,
        quantizeColor: 8,
        quantizeTexcoord: 12
      }),
      
      // Remove unused nodes, materials, etc.
      prune()
    );
    
    // Write optimized file
    await io.write(outputPath, document);
    
    // Get optimized file size
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`📦 Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🎯 Size reduction: ${reduction}%`);
    console.log(`✅ Saved to: ${outputPath}`);
    
    return {
      originalSize,
      optimizedSize,
      reduction: parseFloat(reduction)
    };
    
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting GLB model optimization (Simple Mode)...\n');
  
  const modelsDir = path.join(__dirname, '..', 'public', 'models');
  const optimizedDir = path.join(__dirname, '..', 'public', 'optimized');
  
  // Ensure optimized directory exists
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }
  
  // Find all GLB files in models directory
  const glbFiles = fs.readdirSync(modelsDir)
    .filter(file => file.toLowerCase().endsWith('.glb'))
    .filter(file => !file.includes('optimized')); // Skip already optimized files
  
  if (glbFiles.length === 0) {
    console.log('❌ No GLB files found in public/models directory');
    return;
  }
  
  console.log(`📁 Found ${glbFiles.length} GLB file(s) to optimize:`);
  glbFiles.forEach(file => console.log(`   - ${file}`));
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  const results = [];
  
  // Process each file
  for (const file of glbFiles) {
    const inputPath = path.join(modelsDir, file);
    const outputPath = path.join(optimizedDir, file);
    
    try {
      const result = await optimizeModel(inputPath, outputPath);
      results.push({ file, ...result });
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
    } catch (error) {
      console.error(`Failed to optimize ${file}`);
    }
  }
  
  // Summary
  console.log('\n📊 OPTIMIZATION SUMMARY');
  console.log('========================');
  results.forEach(result => {
    console.log(`${result.file}: ${(result.originalSize / 1024 / 1024).toFixed(2)} MB → ${(result.optimizedSize / 1024 / 1024).toFixed(2)} MB (${result.reduction}% reduction)`);
  });
  
  const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`\n🎯 Total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB (${totalReduction}% reduction)`);
  console.log('✅ Optimization complete!');
}

// Run the optimization
main().catch(console.error); 