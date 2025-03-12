until mc alias set local http://minio:9000 minio minio123; do
  echo "Esperando a que MinIO esté disponible..."
  sleep 3
done

mc mb local/dv-images || echo "El bucket ya existe."
mc anonymous set public local/dv-images